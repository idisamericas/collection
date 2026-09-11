// ---------------------------------------------------------------------------
// 1. ADD THIS WITH YOUR OTHER TARGET SELECTORS
// ---------------------------------------------------------------------------

const atlantaPaperTarget =
  document.querySelector('#atlanta-paper-target');


// ---------------------------------------------------------------------------
// 2. ADD THESE HANDLERS NEAR foundAtlanta() / lostAtlanta()
// ---------------------------------------------------------------------------

function foundAtlantaPaper() {
  /*
    The paper card is an alternate recognition target for the SAME
    Atlanta experience and SAME collection item.

    Do NOT create a new collection ID.
    Do NOT create a new presentation side.
  */
  beginPresentation('atlanta', 'scan');
}

function lostAtlantaPaper() {
  /*
    Same detached-experience behavior as the physical Atlanta target.
    Once recognized, losing the paper target does not close the experience.
  */
}


// ---------------------------------------------------------------------------
// 3. ADD THESE EVENT LISTENERS WITH YOUR OTHER targetFound/targetLost EVENTS
// ---------------------------------------------------------------------------

if (atlantaPaperTarget) {
  atlantaPaperTarget.addEventListener(
    'targetFound',
    foundAtlantaPaper
  );

  atlantaPaperTarget.addEventListener(
    'targetLost',
    lostAtlantaPaper
  );
}


// ---------------------------------------------------------------------------
// COLLECTION NOTE
// ---------------------------------------------------------------------------
//
// Do NOT add another collection ID.
//
// Keep:
//   const GSX_2026_COIN_ID = 'gsx2026-atlanta';
//
// Your existing beginPresentation() already does:
//
//   if (source === 'scan' && side === 'atlanta') {
//     unlockGSX2026Coin();
//   }
//
// Because BOTH Atlanta targets call:
//   beginPresentation('atlanta', 'scan');
//
// they both unlock the SAME Atlanta collectible and play the SAME interaction.
// ---------------------------------------------------------------------------
