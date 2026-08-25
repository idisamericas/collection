# IDIS Americas GSX 2026 WebAR Coin
## Build 37 — State Voiceover Duration

Production repo: `idisamericas/collection`

Production Pages URL:
`https://idisamericas.github.io/collection/`

## Atlanta / State side — targetIndex 0

The fixed 30-second countdown has been removed.

The presentation duration is now controlled by:

`assets/audio/state-voiceover.mp3`

Flow:

1. Atlanta/state side is recognized.
2. `state-voiceover.mp3` begins.
3. Atlanta layers reveal on the existing 1 / 2 / 3-second visual timing.
4. Drag, pinch, and phone tilt remain active.
5. The voiceover continues for its natural duration.
6. When the MP3 fires its `ended` event, the Atlanta Thank You card appears.
7. After the closing card, scanning mode returns.

If the visitor flips to the IDIS side before the MP3 ends, the Atlanta
voiceover is stopped and reset immediately.

## IDIS side — targetIndex 1

Unchanged from Build 36:
- transparent coin WebM
- final frame freeze
- abstract teal/blue plus-symbol parallax
- One Solution. One Company.
- YouTube feature
- See you next time, {Name}
- SEE SECURITY SMARTER

## New required file

`assets/audio/state-voiceover.mp3`

The MP3 itself was not provided in this chat, so the package contains the
correct audio folder and instructions but not the actual voiceover file.

## Existing runtime files to preserve

- assets/targets/gsx2026-two-sided.mind
- assets/video/idis-showcase-alpha.webm
- assets/parallax/atlanta/layer-1-back.mp4
- assets/parallax/atlanta/layer-2-middle.png
- assets/parallax/atlanta/layer-3-front.png

## Test

`https://idisamericas.github.io/collection/?v=37`

Console:

`[IDIS WebAR] Build 37 State Voiceover: 20260825-statevoice37`
