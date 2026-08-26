# Build 40 test plan

## Homepage
- Loads without downloading A-Frame or MindAR.
- Collection carousel renders.
- Optimized WebP coin thumbnail is used after unlock.
- My Collection opens and closes.
- Save to Cloud opens account UI.

## Local-first collection
- Clear site data -> 0/5.
- Scan GSX coin -> local collection becomes 1/5.
- Refresh -> 1/5 remains.
- Tap saved coin -> Atlanta replay starts without camera.

## Cloud account
- With config blank, page remains fully usable and says Device Only.
- With valid Supabase config, Send Sign-in Code works.
- Verify OTP creates/restores session.
- Existing local collection upserts into user_collectibles.
- Signing in on a second browser downloads the cloud collection into localStorage.
- Sign out preserves device collection.

## AR lazy loader
- Start Experience -> status says Loading AR Engine.
- A-Frame loads first, then MindAR.
- Camera starts and target scanning works.
- Close and reopen AR without duplicate script errors.

## Studio
- Unconfigured project shows setup instructions.
- Non-member account is denied Studio access.
- Admin/editor membership opens dashboard.
- Existing collectibles list.
- Metadata can be inserted and updated.

## Diagnostics
- `diagnostics.html` reports all required runtime files and browser capabilities.
