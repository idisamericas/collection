/*
  IDIS Collectible Experience Platform
  Browser-safe configuration only.

  IMPORTANT:
  - A Supabase publishable/anon key is intentionally safe to expose in the browser
    when Row Level Security is enabled.
  - NEVER place a service_role key in this file.
*/
window.IDIS_PLATFORM_CONFIG = Object.freeze({
  appName: 'IDIS Collectibles',
  organizationSlug: 'idis-americas',
  campaignSlug: 'gsx-2026',

  // Set both values to enable real cloud accounts and sync.
  supabaseUrl: 'https://frpbdjselgmjsfvijdwm.supabase.co',
  supabasePublishableKey: 'sb_publishable_KdbBPcqa2hNN6QPllByMjA_6Wdc-9vR',

  auth: {
    enabled: true,
    allowSignup: true,
    otpLength: 6,
    redirectUrl: 'https://idisamericas.github.io/collection/'
  },

  branding: {
    collectionTitle: 'Your Collection',
    collectionSubtitle: 'Collect. Keep. Replay.'
  },

  collectibles: [
    {
      id: 'gsx2026-atlanta',
      slug: 'gsx2026-atlanta',
      title: 'GSX 2026',
      year: 2026,
      dateLabel: 'SEP 14–16',
      location: 'ATLANTA, GA',
      image: './assets/thumbs/gsx2026-atlanta.webp',
      experience: 'atlanta'
    }
  ]
});
