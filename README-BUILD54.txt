IDIS BUILD 54 — ATLANTA PAPER TARGET ADDITION

GOAL
----
The physical Atlanta coin AND the temporary Atlanta paper card launch the
same Atlanta interactive experience and unlock the SAME Atlanta collection item.

No new collection slot is created.

RECOMMENDED MASTER .mind TARGET ORDER
--------------------------------------
targetIndex 0 = IDIS shared side
targetIndex 1 = Atlanta physical coin
targetIndex 2 = Chicago physical coin
targetIndex 3 = Atlanta paper card

IMPORTANT:
Keep 0/1/2 in their existing order when recompiling so you do not have to
remap existing targets. Add the paper target as index 3.

Recommended compiled filename:
assets/targets/idis-collection-2026.mind

SOURCE IMAGE INCLUDED
---------------------
assets/targets/source/03-atlanta-paper.jpg

For the actual MindAR compile, use the exact artwork/photo that will appear
on the printed card. If the final printed card includes a border, text, or
background around the coin, compile the COMPLETE final card artwork rather
than only the coin crop.

COLLECTION BEHAVIOR
-------------------
Both Atlanta targets call:
    beginPresentation('atlanta', 'scan');

Your existing Atlanta unlock logic uses the same collection ID:
    gsx2026-atlanta

Therefore:
- scan physical Atlanta coin -> unlock GSX Atlanta + play Atlanta interaction
- scan Atlanta paper card -> unlock SAME GSX Atlanta + play Atlanta interaction
- scanning both -> collection still contains only ONE Atlanta item

FILES IN THIS PATCH
-------------------
index-target-markup.html
ar-paper-target-snippet.js
assets/targets/source/03-atlanta-paper.jpg
