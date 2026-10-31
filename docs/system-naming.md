# System names and insight contract

Keep system name, family, section function/layout, and internal production metadata independent. Production metadata must not be rendered as UI tags. Do not encode provenance or section structure in a system ID.

| Stable ID | Display name | Former name | Family |
| --- | --- | --- | --- |
| `editorial-01` | Quiet Serif | Quiet Direction | Editorial / Portfolio |
| `blueprint-source` | Blueprint | Blueprint Study | Creative tools |

Reusable names pair a defining visual trait with an element, such as Quiet + Serif. A reference collection keeps the attributed product name. Do not display production-mode tags anywhere in the interface.

The current library contains two collections and two visual languages: Quiet Serif and Blueprint. Cobalt Grid (formerly Signal Workshop) was removed on 31 October 2026 because it duplicated Blueprint. Its `signal-*` sections are no longer registered or rendered; old links fall back to the library. Historical production evidence and unused original implementation files remain archived. Quiet Serif and Blueprint IDs and routes remain stable.

For sections, keep function first and layout second: `Quiet Serif / Hero / Split image`. A new layout does not require a new system. A system branch needs a meaningful visual rule change, recorded with its evidence.

## System-led insights

Each registered system supplies a visual signature, an actual rendered preview with caption, aliases, and an insight object answering:

- What is the central visual idea and why do its elements work together?
- What content or product is it suited to, and what is the trade-off?
- Which composition rules define it? Tie claims to captures and source tokens.
- What stays fixed when extending it, and what may vary by section?
- What is source evidence, what is an original decision, and what is unavailable?
- How does it relate to other registered systems?

These are design guidance based on the retained references, not measured claims about conversion or user preference. The public browser puts guidance before technical tokens; the registry keeps layout/content separate from shared tokens. New previews must come from a real rendered implementation, not a synthetic mockup. Keep provenance distinctions in internal evidence and descriptive reference notes. The owner rejected “Original expansion” and “Source study” throughout the product; do not reintroduce these phrases or equivalent mode badges. Use “Reference” when a comparison selector needs a functional name.

Browser implementation: `pilot/src/system-browser.jsx` and `system-browser.css`. The neutral browser theme lives in `library-tokens.css`; each showcased system retains its own tokens. Registry metadata remains in `data.js`. Production evidence is recorded in `docs/runs/system-browser-2026-10-30/`.
