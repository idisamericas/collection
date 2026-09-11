IDIS BUILD 54.1 — BUILD 53 + GROUPED MIND + ATLANTA PAPER TARGET

THIS PACKAGE INCLUDES
- Build 53 burst / QR / visual changes
- Existing contact + collection pages from the current full patch base
- New grouped target wiring
- Atlanta paper target aliases to the SAME Atlanta experience
- Paper source image for reference

MASTER .MIND FILE REQUIRED
Upload your newly compiled file here:

  assets/targets/idis-collection-2026.mind

COMPILE ORDER MUST BE EXACTLY:
  0 = IDIS shared side
  1 = Atlanta physical coin
  2 = Chicago coin
  3 = Atlanta paper card

IMPORTANT
The .mind binary itself is NOT generated inside this patch. Use the MindAR
compiler and place your exported file at the exact path above.

ATLANTA COLLECTION BEHAVIOR
Physical Atlanta target and paper Atlanta target both call:

  beginPresentation('atlanta', 'scan');

Both therefore unlock the existing single collection ID:

  gsx2026-atlanta

No second Atlanta collection slot is created.

PAPER TARGET SOURCE
Included for reference:
  assets/targets/source/03-atlanta-paper.jpg

For best recognition, compile the exact FINAL PRINTED CARD artwork. If the
printed card has borders/text/background around the coin, use the whole final
card image as targetIndex 3, not just a cropped coin photo.

DEPLOY
1. Upload index.html, ar.js, styles.css and the included pages over the site.
2. Upload your compiled assets/targets/idis-collection-2026.mind.
3. Hard refresh / clear site cache on the phone.
4. Test targets in order, especially paper target #3.
