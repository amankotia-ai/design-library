# Website type systems

- Start: 31 October 2026, 16:32 IST. Deadline: 16:52 IST (default 20-minute budget).
- Scope: replace the single title specimen on design system pages with an evidence-backed view of each site's typography roles; repair Signal Grid's missing font loading and inaccurate family description.
- Completion: representative observed typography roles, actual available font faces and truthful measurements/limitations, reusable across systems; desktop and mobile previews; build and independent review of delivered revision.
- Mode: extract and present existing reconstructed site systems, not invent an unseen type scale. Reference: user screenshot `/var/folders/tx/z_rvf2qn2wz6sjz__fnlmmd40000gn/T/TemporaryItems/NSIRD_screencaptureui_Wh3Jet/Screenshot 2026-10-31 at 4.31.35 PM.png`.
- Team: `/root/type_visual_analysis`, `/root/type_product_design`, `/root/type_art_direction`; parent implementation; independent QA pending.
- Freebyrd index, thread and reference queries returned no folder-specific context.

## Evidence and implementation

Measured computed styles from the assembled pages at 1440 × 1000; results are in `pilot/evidence/type-systems/desktop-computed.json`, with Shadow DOM samples in `conare-desktop-computed.json` and evaluation-page samples in `conare-evals-computed.json`. The extraction describes the current reconstructed pages, not a claim of every source-site state or breakpoint. Quiet Serif and Signal Serif use explicitly disclosed substitute fonts. The Signal Grid homepage uses Faculty Glyphic and Geist; Inter appears on the evaluations reconstruction. Geist Mono is retained as an asset, but its use was not observed in these specimens.

The data registry `pilot/src/type-systems.js` records observed roles; `type-systems.css` loads the relevant retained or substitute faces directly in the system detail view. Large specimens scale down at narrow widths with proportional tracking. The screen shows desktop values and flags this responsive adaptation. Previews: `pilot/evidence/type-systems/conare-desktop.png` and `conare-mobile.png`.

Visual analysis `/root/type_visual_analysis`, product design `/root/type_product_design`, and art direction `/root/type_art_direction` inspected the supplied screenshot and implementation/source evidence. Independent QA `/root/type_independent_qa` identified missing Signal Grid action and eyebrow roles and fixed-pixel tracking on scaled mobile specimens; both findings were corrected and the delivered revision re-rendered. QA then passed after inspecting desktop/mobile Signal Grid and spot-checking Blueprint, Interfere, Conversion, and Plasticity at 1440px and 390px.

Validation: Vite production build passed with the existing chunk-size warning. Direct-route browser checks found font specimens on all nine systems and no horizontal overflow on the 390px Signal Grid page. Final source SHA-256: `type-systems.js` `342076e972591977669b5598c60128e64c967f6bcd89779b05342f1111f24ee9`; `type-systems.css` `3311a478339d04c7a41070b22833659cca478068d905d3b44afdeafb006d5329`; `system-browser.jsx` `43bb7f9617eb8aec5669df472a7f411ef06ac63350bbf6880bd188a4785c2b4f`.
