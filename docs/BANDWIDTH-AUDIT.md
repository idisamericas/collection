# Bandwidth and performance plan

## Already changed in Build 40

- A-Frame and MindAR no longer load on the collection homepage. They load only after `START THE EXPERIENCE` is tapped, in strict A-Frame -> MindAR order.
- The 2048x2048 5+ MB GSX reference PNG is no longer used by the homepage carousel. A 640px WebP thumbnail is used instead.
- Supabase's JS client is lazy-imported only when cloud account functionality is needed.
- Large Atlanta / IDIS media remains `preload="metadata"` or lazy-warmed after the camera is running.
- YouTube remains lazy-loaded only when the IDIS sequence reaches that section.

## Recommended media targets

### `state-voiceover.mp3`
Voice only does not need music-grade bitrate. Start with:

```bash
ffmpeg -i state-voiceover-master.wav -ac 1 -ar 44100 -b:a 96k state-voiceover.mp3
```

Use 128 kbps if music is prominent.

### Atlanta background MP4
For a 1080x1080 background loop:

```bash
ffmpeg -i layer-1-back-master.mov -vf "scale=1080:1080" -c:v libx264 -preset slow -crf 25 -pix_fmt yuv420p -movflags +faststart -an layer-1-back.mp4
```

Try CRF 26-28 if it remains visually clean on a phone.

### Transparent IDIS WebM
Transparency is expensive. Keep dimensions and duration tight. Test 720-960px wide if the visual remains sharp because the element is composited on a phone screen. For VP9 alpha use an encoder that preserves alpha, then verify with `ffprobe` and Chrome.

### PNG layers
Use WebP with alpha for photographic / soft-edged assets. Keep PNG only when it genuinely looks cleaner.

```bash
cwebp -q 82 layer-2-middle.png -o layer-2-middle.webp
```

Update the HTML paths after visual QA.

## CDN / hosting

For a commercial version, move large videos away from the GitHub repository to object storage + CDN. Keep code on a static host and media behind cache-friendly immutable URLs.

Recommended cache policy for versioned media:

`Cache-Control: public, max-age=31536000, immutable`

Use a new filename or query version whenever an asset changes.
