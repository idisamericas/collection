# IDIS Americas GSX 2026 WebAR Coin
## Build 38 — State Voiceover Final Five-Second Thank You

Production repo: `idisamericas/collection`

## Atlanta / State side

`assets/audio/state-voiceover.mp3` remains the master timeline.

The Thank You screen now begins exactly during the final five seconds of
the voiceover.

Example if the MP3 is 24 seconds long:

- 0:00 to 0:19 — Atlanta layered parallax experience
- 0:19 — Thank You section starts
- 0:19 to 0:24 — final five seconds of voiceover continue under Thank You
- 0:24 — audio ends
- Thank You fades out
- `SCAN COIN NOW` returns

The code uses the actual MP3 duration, so no manual duration value is needed.

## IDIS side

Unchanged from Build 37 / Build 36 abstract parallax version.

## Required audio

`assets/audio/state-voiceover.mp3`

## Test

`https://idisamericas.github.io/collection/?v=38`

Console:
`[IDIS WebAR] Build 38 State Finale: 20260825-statefinale38`
