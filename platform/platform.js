(() => {
  'use strict';

  const cfg = window.IDIS_PLATFORM_CONFIG || {};
  const COLLECTION_KEY = 'idis-digital-coin-collection-v1';
  const ANON_KEY = 'idis-collector-anonymous-id-v1';
  const configReady = Boolean(cfg.supabaseUrl && cfg.supabasePublishableKey);

  let supabase = null;
  let supabaseLoadPromise = null;
  let session = null;
  let authEmail = '';
  let toastTimer = 0;
  let cloudContext = null;

  const $ = (q, root=document) => root.querySelector(q);
  const escapeHTML = (value='') => String(value).replace(/[&<>'"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]));

  function anonymousId() {
    try {
      let id = localStorage.getItem(ANON_KEY);
      if (!id) {
        id = (crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`);
        localStorage.setItem(ANON_KEY, id);
      }
      return id;
    } catch (_) { return 'storage-disabled'; }
  }

  function readLocalCollection() {
    try {
      const raw = localStorage.getItem(COLLECTION_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
      return Array.isArray(parsed?.coins) ? parsed.coins : [];
    } catch (_) { return []; }
  }

  function writeLocalCollection(ids) {
    try {
      localStorage.setItem(COLLECTION_KEY, JSON.stringify({version:1, coins:[...new Set(ids)], updatedAt:Date.now()}));
    } catch (_) {}
    window.dispatchEvent(new CustomEvent('idis:cloud-collection-merged'));
  }

  function toast(message) {
    const node = $('#platform-toast');
    if (!node) return;
    node.textContent = message;
    node.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => node.classList.remove('show'), 2300);
  }

  function syncLabel(text, state='') {
    const node = $('#platform-sync-state');
    if (!node) return;
    node.textContent = text;
    node.className = `platform-sync-state ${state}`.trim();
  }

  async function loadSupabase() {
    if (supabase) return supabase;
    if (supabaseLoadPromise) return supabaseLoadPromise;
    if (!configReady) throw new Error('Cloud sync has not been configured yet.');

    supabaseLoadPromise = (async () => {
      const mod = await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm');
      supabase = mod.createClient(cfg.supabaseUrl, cfg.supabasePublishableKey, {
        auth: { persistSession:true, autoRefreshToken:true, detectSessionInUrl:true }
      });
      return supabase;
    })().catch(error => {
      supabaseLoadPromise = null;
      throw error;
    });

    return supabaseLoadPromise;
  }

  async function ensureCloudContext() {
    if (cloudContext) return cloudContext;
    const client = await loadSupabase();
    const {data:org,error:orgError}=await client.from('organizations').select('id,slug').eq('slug',cfg.organizationSlug).maybeSingle();
    if(orgError)throw orgError;
    let campaign=null;
    if(org?.id&&cfg.campaignSlug){const {data,error}=await client.from('campaigns').select('id,slug').eq('organization_id',org.id).eq('slug',cfg.campaignSlug).maybeSingle();if(error)throw error;campaign=data||null;}
    const slugs=(cfg.collectibles||[]).map(x=>x.slug).filter(Boolean);
    let collectibleMap=new Map();
    if(slugs.length){const {data,error}=await client.from('collectibles').select('id,slug').in('slug',slugs);if(error)throw error;collectibleMap=new Map((data||[]).map(x=>[x.slug,x.id]));}
    cloudContext={organizationId:org?.id||null,campaignId:campaign?.id||null,collectibleMap};
    return cloudContext;
  }

  function collectedConfigItems() {
    const ids = new Set(readLocalCollection());
    return (cfg.collectibles || []).filter(item => ids.has(item.id));
  }

  function buildShowcase() {
    const grid = $('#showcase-grid');
    const total = $('#showcase-total');
    if (!grid) return;
    const collected = collectedConfigItems();
    if (total) total.textContent = `${collected.length} COLLECTED`;
    const items = [];
    for (const item of collected) {
      items.push(`<button class="showcase-item" type="button" data-replay="${escapeHTML(item.id)}"><img loading="lazy" decoding="async" src="${escapeHTML(item.image)}" alt="${escapeHTML(item.title)} collectible"><h3>${escapeHTML(item.title)}</h3><p>${escapeHTML(item.dateLabel)}<br>${escapeHTML(item.location)}</p></button>`);
    }
    const totalSlots = Math.max(5, collected.length + 4);
    for (let i=collected.length; i<totalSlots; i++) {
      items.push('<div class="showcase-item locked"><div class="showcase-ring">+</div><h3>Future Drop</h3><p>More collectible experiences can live here.</p></div>');
    }
    grid.innerHTML = items.join('');
    grid.querySelectorAll('[data-replay]').forEach(btn => btn.addEventListener('click', () => {
      closeLayer('showcase-layer');
      const card = document.querySelector(`[data-coin-id="${CSS.escape(btn.dataset.replay)}"]`);
      if (card) card.click();
    }));
  }

  function openLayer(id) { const node=$(`#${id}`); if(node){node.classList.add('open');node.setAttribute('aria-hidden','false');} }
  function closeLayer(id) { const node=$(`#${id}`); if(node){node.classList.remove('open');node.setAttribute('aria-hidden','true');} }

  function renderAuth() {
    const accountBtn = $('#platform-account-button');
    const cloudBtn = $('#platform-cloud-button');
    const card = $('#platform-account-card');
    const signout = $('#platform-signout');
    const signedIn = Boolean(session?.user);
    if (accountBtn) accountBtn.textContent = signedIn ? 'ACCOUNT' : 'SAVE TO CLOUD';
    if (cloudBtn) cloudBtn.textContent = signedIn ? 'SYNCED ACCOUNT' : 'SAVE TO CLOUD';
    if (signout) signout.hidden = !signedIn;

    const emailForm = $('#platform-email-form');
    const otpForm = $('#platform-otp-form');

    if (emailForm) {
      emailForm.hidden = signedIn;
    }

    if (otpForm && signedIn) {
      otpForm.hidden = true;
    }

    if (card) {
      if (signedIn) {
        const email = session.user.email || 'Collector';
        card.innerHTML = `<div class="platform-avatar">${escapeHTML(email.charAt(0).toUpperCase())}</div><div><strong>Collection saved</strong><span>${escapeHTML(email)}</span></div>`;
      } else {
        card.innerHTML = '<div class="platform-avatar">+</div><div><strong>Guest collection</strong><span>Saved on this device only</span></div>';
      }
    }
    if (!configReady) syncLabel('DEVICE ONLY');
    else if (signedIn) syncLabel('CLOUD SYNC ON','online');
    else syncLabel('NOT SIGNED IN');
  }

  async function refreshSession() {
    if (!configReady) { renderAuth(); return; }
    try {
      const client = await loadSupabase();
      const {data, error} = await client.auth.getSession();
      if (error) throw error;
      session = data.session || null;
      renderAuth();
      if (session) await syncCollections();
      client.auth.onAuthStateChange((_event, next) => {
        session = next || null;
        renderAuth();
        if (session) setTimeout(syncCollections,0);
      });
    } catch (error) {
      console.warn('[Platform] Auth init:', error);
      syncLabel('CLOUD ERROR','error');
    }
  }

  async function sendOtp(email) {
    const client = await loadSupabase();
    const {error} = await client.auth.signInWithOtp({
      email,
      options: { shouldCreateUser: cfg.auth?.allowSignup !== false }
    });
    if (error) throw error;
    authEmail = email;
  }

  async function verifyOtp(token) {
    const client = await loadSupabase();
    const {data, error} = await client.auth.verifyOtp({ email:authEmail, token, type:'email' });
    if (error) throw error;
    session = data.session || null;
    await syncCollections();
    renderAuth();
  }

  async function fetchCloudCollection() {
    if (!session?.user || !supabase) return [];
    const {data, error} = await supabase
      .from('user_collectibles')
      .select('collectible:collectibles(slug)')
      .eq('user_id', session.user.id);
    if (error) throw error;
    return (data || []).map(row => row.collectible?.slug).filter(Boolean);
  }

  async function cloudCollectibleMap(slugs) {
    if (!slugs.length) return new Map();
    const {data, error} = await supabase.from('collectibles').select('id,slug').in('slug', slugs);
    if (error) throw error;
    return new Map((data || []).map(row => [row.slug,row.id]));
  }

  async function syncCollections() {
    if (!configReady || !session?.user) return;
    try {
      syncLabel('SYNCING…');
      const local = readLocalCollection();
      const map = await cloudCollectibleMap(local);
      const rows = local.map(slug => map.has(slug) ? ({user_id:session.user.id, collectible_id:map.get(slug), claim_source:'scan'}) : null).filter(Boolean);
      if (rows.length) {
        const {error} = await supabase.from('user_collectibles').upsert(rows,{onConflict:'user_id,collectible_id',ignoreDuplicates:true});
        if (error) throw error;
      }
      const cloud = await fetchCloudCollection();
      writeLocalCollection([...new Set([...local,...cloud])]);
      syncLabel('CLOUD SYNC ON','online');
      buildShowcase();
      track('collection_sync',{count:[...new Set([...local,...cloud])].length});
    } catch (error) {
      console.warn('[Platform] Sync:',error);
      syncLabel('SYNC RETRY LATER','error');
    }
  }

  async function track(eventType, metadata={}) {
    if (!configReady) return;
    try {
      const client = await loadSupabase();
      const context = await ensureCloudContext();
      const coinSlug = metadata.coinId || metadata.collectibleSlug || null;
      const payload = {
        organization_id:context.organizationId,
        campaign_id:context.campaignId,
        collectible_id:coinSlug ? (context.collectibleMap.get(coinSlug) || null) : null,
        event_type:eventType,
        anonymous_id:anonymousId(),
        user_id:session?.user?.id || null,
        metadata
      };
      await client.from('activity_events').insert(payload);
    } catch (_) {}
  }

  function wireUI() {
    const accountBtn=$('#platform-account-button');
    const cloudBtn=$('#platform-cloud-button');
    const showcaseBtn=$('#platform-showcase-button');
    [accountBtn,cloudBtn].filter(Boolean).forEach(btn=>btn.addEventListener('click',()=>{renderAuth();openLayer('account-layer');}));
    showcaseBtn?.addEventListener('click',()=>{buildShowcase();openLayer('showcase-layer');track('showcase_open');});
    document.querySelectorAll('[data-platform-close]').forEach(btn=>btn.addEventListener('click',()=>closeLayer(btn.dataset.platformClose)));
    document.querySelectorAll('.platform-layer').forEach(layer=>layer.addEventListener('click',e=>{if(e.target===layer)closeLayer(layer.id);}));

    const emailForm=$('#platform-email-form');
    const otpForm=$('#platform-otp-form');
    const note=$('#platform-auth-note');
    const dev=$('#platform-dev-banner');
    if (!configReady && dev) dev.classList.add('show');

    emailForm?.addEventListener('submit',async e=>{
      e.preventDefault();
      const email=$('#platform-email')?.value.trim();
      if(!email)return;
      if(!configReady){ if(note){note.className='platform-note';note.textContent='Cloud accounts are ready in the code, but this deployment still needs a Supabase URL and publishable key in platform/platform-config.js.';} return; }
      const submit=emailForm.querySelector('button[type=submit]');
      try{submit.disabled=true;submit.textContent='SENDING…';await sendOtp(email);emailForm.hidden=true;otpForm.hidden=false;$('#platform-otp')?.focus();if(note){note.className='platform-note';note.textContent=`Check ${email}. Use the secure sign-in link, or enter the 6-digit code if your email template includes one.`;}}catch(error){if(note){note.className='platform-note error';note.textContent=error.message || 'Could not send the code.';}}finally{submit.disabled=false;submit.textContent='SEND SIGN-IN EMAIL';}
    });

    otpForm?.addEventListener('submit',async e=>{
      e.preventDefault();
      const token=$('#platform-otp')?.value.replace(/\D/g,'');
      if(!token)return;
      const submit=otpForm.querySelector('button[type=submit]');
      try{submit.disabled=true;submit.textContent='VERIFYING…';await verifyOtp(token);closeLayer('account-layer');toast('Collection saved to your account');track('login_complete');}catch(error){if(note){note.className='platform-note error';note.textContent=error.message || 'That code could not be verified.';}}finally{submit.disabled=false;submit.textContent='VERIFY & SAVE';}
    });

    $('#platform-signout')?.addEventListener('click',async()=>{
      try{if(supabase)await supabase.auth.signOut();}catch(_){}session=null;renderAuth();closeLayer('account-layer');toast('Signed out. Device collection kept.');
    });
  }

  window.addEventListener('idis:collection-changed', async event => {
    buildShowcase();
    toast('Collectible added to your collection');
    await track('collectible_unlock', event.detail || {});
    if (session) await syncCollections();
  });
  window.addEventListener('idis:cloud-collection-merged',()=>buildShowcase());
  window.addEventListener('idis:experience-replay',event=>track('experience_replay',event.detail||{}));

  document.addEventListener('DOMContentLoaded',()=>{
    wireUI();
    buildShowcase();
    renderAuth();
    refreshSession();
    track('page_view',{path:location.pathname});
  });
})();
