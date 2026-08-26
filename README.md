# IDIS Collectible Experience — Build 42 3D Coin Replay

## New collection replay intro
When a saved GSX 2026 coin is tapped from the local collection:

1. The Atlanta/state experience starts normally.
2. `assets/reference/GSX2026-Coin-Back.png` is lazy-loaded only at replay time.
3. The coin rises into the screen center over 3 seconds.
4. It remains centered for 6 seconds.
5. It fades away over 1.2 seconds while the Atlanta experience continues.
6. The coin uses the same phone tilt and drag values as the Atlanta preserve-3D scene.

The coin uses ten lightweight CSS metal depth slices behind the PNG face to create visible thickness under rotation. No additional WebGL renderer is used.

## Camera
Build 42 also completes the camera rollback started in Build 41:
- A-Frame 1.5.0 loads synchronously first.
- MindAR 1.2.5 loads synchronously second.
- `ar.js` no longer tries to dynamically load a second MindAR copy.

## Local only
No Supabase, email, cloud save, or account code is included. Collections remain in browser `localStorage`.

## Required production media
Keep/add:
- `assets/targets/gsx2026-two-sided.mind`
- `assets/audio/state-voiceover.mp3`
- `assets/video/idis-showcase-alpha.webm`
- `assets/parallax/atlanta/layer-1-back.mp4`
- `assets/parallax/atlanta/layer-2-middle.png`
- `assets/parallax/atlanta/layer-3-front.png`

Cache key: `20260826-coin3d42`
