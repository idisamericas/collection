# IDIS Collectible Experience — Build 44.1 Launch Fix

This hotfix repairs the Start Experience failure introduced in Build 44.

## Fixed
- Declared `idisVoiceover` before its event listeners and helper functions use it.
- Declared `idisFeatureBottomVideo` before the IDIS layer sequence uses it.
- Removed stale YouTube DOM references left behind after the YouTube segment was removed.
- Preserved the proven A-Frame → MindAR → ar.js startup order.

## IDIS MP3
The intended file path remains:

`assets/audio/idis-voiceover.mp3`

If that file is not uploaded yet, the browser may log a 404 when it attempts to prime/play the IDIS narration, but it must not prevent the Start Experience button or camera from launching.

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


## Build 44.2 — Chicago Folder Preparation

Chicago has been added using the original category-based folder structure rather than moving existing Atlanta assets.
No Chicago runtime paths are active yet, so missing Chicago media will not affect the current experience.

See `docs/ASSET-FOLDER-MAP.txt` for the naming map and the README files inside the new Chicago asset locations.
