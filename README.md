# IDIS Collectible Experience Platform — Build 41 Local Lite

This build is the lightweight, device-only version.

## What changed
- Restored the proven A-Frame + MindAR script load order in `index.html` for camera stability.
- Removed all cloud, account, email-code, and Supabase functionality.
- Kept the local on-device collection and replay flow.
- Added the new IDIS coin favicon at `assets/ui/favicon-coin.png`.
- Kept the GSX collection carousel on the homepage.
- Removed Studio, diagnostics, and cloud UI to keep the bundle lighter.

## Local storage used
- `idis-digital-coin-collection-v1`
- `idis-gsx2026-guest-name`

## Required production assets to add back before deployment
- `assets/targets/gsx2026-two-sided.mind`
- `assets/audio/state-voiceover.mp3`
- `assets/video/idis-showcase-alpha.webm`
- `assets/parallax/atlanta/layer-1-back.mp4`
- `assets/parallax/atlanta/layer-2-middle.png`
- `assets/parallax/atlanta/layer-3-front.png`
- `assets/ui/idis-logo.png`

## Lightweight tips
- Keep the Atlanta back video at 1080x1080 H.264, no audio.
- Use WebP for static layer images when transparency allows.
- Keep voiceover MP3 around 96–128 kbps mono.
- Use the 640px WebP coin thumb for UI, not the full PNG.
