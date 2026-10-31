# Product review: Cobalt Grid removal

Reviewer: `/root/product_review`. Scope: source-level acceptance criteria for removing a duplicate collection; no implementation or final QA claim.

The user clarified that Cobalt Grid is the same as Blueprint. Keep Blueprint as the sole blue creative-tools collection, with Quiet Serif as the other collection. Do not rename Blueprint or merge the rejected expansion's content into it.

Acceptance criteria:

- Home lists Quiet Serif and Blueprint only. Collection counts derive from the two remaining system records.
- Study and System collection selectors contain no Cobalt Grid / Signal Workshop option. No section record belongs to `signal-01`; no `signal-*` comparison is exposed.
- `?view=signal-page`, `signal-hero`, `signal-workshop`, `signal-features`, `signal-faq`, and `signal-footer` cannot render the rejected implementation. A consistent existing fallback is sufficient; no new error UI is needed for this removal.
- Old `?section=signal-*` links resolve safely through the existing section validation, without dereferencing an absent system. Remaining sections still point to registered systems.
- Blueprint's eleven section/page records, source comparisons, source fonts/media, and direct `blueprint-*` views remain intact. Quiet Serif behavior is unchanged.
- User-visible guidance must not recommend Cobalt Grid, describe a separate Signal Workshop collection, or claim that there are three collections. Preserve historical evidence as history rather than rewriting previous reviews.

Dependencies inspected: `data.js` registers the rejected system twice (initial object and display metadata) and uses numeric system indexes; removing index 1 requires updating Blueprint's later metadata assignment. `main.jsx` imports and renders the original implementation independently from the registry, so registry removal alone is insufficient. It also contains signal-specific selector and guidance branches. `blueprint-faithful.jsx` source notes refer to Signal Workshop; those visible notes need cleanup. `system-browser.jsx` derives cards, section inventory and links from the registry; it needs no replacement collection. Its unused signal specimen styling can be removed as cleanup.

Validation requested: inspect Home at desktop and mobile; check both remaining collection links and selectors, a removed section link, all six removed view routes, and Blueprint's assembled view. Run existing build/check scripts. Independent QA must inspect the delivered revision.
