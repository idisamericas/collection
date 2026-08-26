# IDIS Collectible Experience Platform — Build 40

This build turns the GSX prototype into a local-first, cloud-ready, white-label platform baseline.

## What works without a database
- GSX AR experience
- Atlanta audio-driven finale
- IDIS abstract parallax experience
- persistent local collection
- saved coin replay without camera
- mobile My Collection showcase
- graceful Device Only account state

## What activates when Supabase is configured
- passwordless email OTP account
- persisted Supabase session
- local collection -> cloud merge
- cloud collection -> new-device restore
- activity events
- Studio authorization and collectible metadata management

## Setup
1. Deploy this folder to `idisamericas/collection`.
2. Preserve/copy your production runtime media and `.mind` target into the existing paths.
3. Follow `docs/SETUP-SUPABASE.md`.
4. Test `diagnostics.html`.
5. Test the homepage before testing AR.

## Performance changes
The homepage no longer downloads A-Frame or MindAR before the visitor chooses AR. The carousel uses `assets/thumbs/gsx2026-atlanta.webp` instead of the multi-megabyte reference PNG. The Supabase SDK is also lazy-loaded.

## Production URLs
- Main: `https://idisamericas.github.io/collection/?v=40`
- Studio: `https://idisamericas.github.io/collection/studio.html?v=40`
- Diagnostics: `https://idisamericas.github.io/collection/diagnostics.html?v=40`

Build marker: `20260825-platform40`

## Live cloud status

The connected Supabase project is provisioned and seeded for Build 40. The browser-safe publishable key and project URL are already in `platform/platform-config.js`.

Before production email sign-in, set Supabase Auth Site URL / redirect allow-list to the GitHub Pages collection URL as described in `docs/SETUP-SUPABASE.md`.

The Studio remains intentionally role-protected. After the first admin account signs in, add that user to `organization_members` as `owner`.
