# IDIS Americas GSX 2026 WebAR Coin
## Build 39 — Persistent Digital Collection

Production repo: `idisamericas/collection`

## New homepage collection

A horizontal coin carousel now sits directly below the IDIS logo and above
the main `We See More Than Security.` copy.

The carousel always contains five positions.

Before the physical GSX 2026 coin is scanned, the first position is a teal
outlined placeholder. Four additional teal outlined positions represent future
collectibles.

After either side of the physical GSX 2026 coin is successfully recognized,
the browser stores this coin ID in `localStorage`:

`idis-digital-coin-collection-v1`

The first collection position changes to:

- actual `assets/reference/GSX2026-Coin-Back.png`
- GSX 2026
- Year: 2026
- Date: Sep 14–16
- Location: Atlanta, GA
- Tap to Replay Experience

This persists on the same browser/device.

## Replay without the physical coin

After the GSX coin is collected, tapping it from the homepage launches the
Atlanta/state layered experience directly.

Collection replay:
- does NOT start MindAR
- does NOT request the camera
- does NOT require the physical coin
- still requests motion permission where required
- still plays `state-voiceover.mp3`
- still uses the final-five-second Thank You sequence
- returns to the homepage when complete

The normal `START THE EXPERIENCE` button still launches the live camera scanner.

## Important behavior

Only a real MindAR target recognition unlocks the collectible. Replaying the
saved item does not create an unlock.

Both sides of the GSX coin unlock the same collectible because they are two
faces of the same physical coin.

## Required runtime files

Keep:
- `assets/targets/gsx2026-two-sided.mind`
- `assets/audio/state-voiceover.mp3`
- `assets/video/idis-showcase-alpha.webm`
- `assets/parallax/atlanta/layer-1-back.mp4`
- `assets/parallax/atlanta/layer-2-middle.png`
- `assets/parallax/atlanta/layer-3-front.png`

Included:
- `assets/reference/GSX2026-Coin-Back.png`
- `assets/reference/coin-front.png`
- `assets/ui/idis-logo.png`

## Test

Main:
`https://idisamericas.github.io/collection/?v=39`

Collection-only visual preview:
`https://idisamericas.github.io/collection/collection-preview.html?v=39`

Console:
`[IDIS WebAR] Build 39 Collection Carousel: 20260825-collection39`
