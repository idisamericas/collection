# IDIS Collectible Experience — Build 44 IDIS Audio Layers

This build updates the IDIS side to remove the YouTube dependency and use an audio-driven layered scene.

## IDIS side changes
- Removed the YouTube feature segment.
- Added `assets/audio/idis-voiceover.mp3` support.
- The top transparent WebM now appears coin-sized and tilts with stronger perspective.
- The teal / blue abstract background fills in sooner behind the coin.
- Added a layered scene similar to the State side:
  - top = coin-sized transparent WebM
  - middle = parallax tagline layer
  - bottom = persistent motion video layer
- The top coin layer holds for 4 seconds, then fades away.
- The middle and bottom layers remain active until the MP3 reaches its final five seconds.
- The IDIS thank-you screen begins during the last five seconds of the MP3.

## Required media
- `assets/audio/idis-voiceover.mp3`
- `assets/video/idis-showcase-alpha.webm`

## Optional
- Replace the source of `#idis-feature-bottom-video` if you want a different lower motion layer asset.
