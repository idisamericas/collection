# IDIS Americas GSX 2026 WebAR Coin
## Full Current Package — Build 35 Sphere Mode

This ZIP contains the complete current code and GitHub Pages folder structure.

## Landing page
- IDIS branding
- GSX 2026 limited collectible
- remembered visitor name
- current copy:
  - We See More Than Security.
  - We see what matters. What connects us. What deserves to be protected.
  - Discover more with IDIS and take home something worth remembering.
  - LET'S START WITH YOUR NAME
  - START THE EXPERIENCE

## Atlanta side — targetIndex 0
- detached 3-layer parallax
- background MP4
- middle PNG
- front PNG
- phone tilt
- drag
- pinch
- 30-second presentation
- personalized Thank You closing card

## IDIS side — targetIndex 1
- transparent opening WebM
- black-center / dark-teal full background
- immersive 360 video sphere
- sphere responds to phone tilt + drag
- YouTube feature plane
- “One Solution. One Company.” on the highest foreground layer
- closing:
  - See you next time, {Name}
  - SEE SECURITY SMARTER

## Files you still need to copy from your existing production repo

These large/runtime files were not available in the generated workspace and therefore are NOT inside this ZIP:

```text
assets/targets/gsx2026-two-sided.mind

assets/video/idis-showcase-alpha.webm
assets/video/idis-sphere-360.mp4

assets/parallax/atlanta/layer-1-back.mp4
assets/parallax/atlanta/layer-2-middle.png
assets/parallax/atlanta/layer-3-front.png
```

The IDIS logo IS included:
```text
assets/ui/idis-logo.png
```

## Critical target order
```text
targetIndex 0 = Atlanta / Georgia side
targetIndex 1 = IDIS Americas side
```

Do not lose the working `.mind` file in your current GitHub repo.

## GitHub Pages
Upload the CONTENTS of this project to the repository root, so `index.html` stays at the root.

## Test URLs
Main:
```text
https://renoramirez-create.github.io/idis-limited-coin/?v=35
```

Sphere preview:
```text
https://renoramirez-create.github.io/idis-limited-coin/sphere-mode-preview.html?v=35
```

Camera:
```text
https://renoramirez-create.github.io/idis-limited-coin/camera-test.html
```

## AR library order
Keep:
1. A-Frame 1.5.0
2. MindAR 1.2.5
3. local ar.js

Do NOT add defer/async to A-Frame or MindAR.

## Current YouTube feature
Video ID:
```text
G7vGMc4Z2os
```

YouTube loads lazily during the IDIS experience.

## Recommended sphere file
```text
assets/video/idis-sphere-360.mp4
```

Recommended:
- 2048 × 1024
- 2:1 equirectangular
- H.264
- 30 fps
- no audio
- web optimized / fast start
