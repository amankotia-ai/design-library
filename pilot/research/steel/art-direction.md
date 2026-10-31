# Steel art direction — 2026-10-31 IST

Role: actual art-direction subagent `/root/steel_art`. Inspecting original rendered source, not implementation. Status: direction delivered; final implementation visual review remains independent QA's responsibility.

## Images inspected

- `art-source-desktop.png`: 1440 × 1000 source viewport.
- `art-source-full.jpg`: 1440 × 13900 source full page.
- `art-source-mobile.png`: 390 × 844 source viewport, real observed responsive source.
- `art-observations.json`: computed source measurements captured from live DOM.

These are complementary browser captures, not REA outputs. The visual analyst owns the real REA evidence separately.

## Shared language

Use the human-readable collection name **Steel**, retaining source attribution. The source's character is flat color bands, thin electric-blue architectural wireframe, broad unembellished sans typography, tiny uppercase monospace utilities, and minimally rounded browser/terminal frames. It is a developer-infrastructure story whose product proof is visible as literal code and browser chrome.

The opening is cyan, not orange: hero background is `#d7f0ff`; announcement is saturated electric blue. Type is actual source `schengenA` with system fallback in computed CSS. Font files should be recovered if available; a substitute must be disclosed. The source changes accents across sections: lavender use cases, pastel cyan/apricot/green/yellow product demos, warm gray SDK and FAQ surfaces, black enterprise band, colorful editorial cards, cyan CTA and oversized purple footer logo. These flat band changes are an observed source signature, not a request to apply generic gradients.

## Measured first viewport criteria

At 1440 × 1000:

- Announcement strip: y0–36. Header: y36–108, transparent over cyan.
- Main hero is full-width and ends at y500.
- Logo and content use approximately x80 and right x1360; underlying section wrapper x56 + 24 inner padding.
- H1 computed box x68, y278.22, 1292 × 181.78; ink glyphs start around x80. Font 60px / 60.6, three lines: Browser / Infrastructure / for AI Agents.
- Wireframe occupies most of the upper/right hero and approaches/extends behind the headline. Preserve line density, vanishing point, 1px stroke, clipping at hero bounds. An invented sparse grid is visibly different.
- Intro source section starts y600. Description uses 24px / 31.2, with desktop CTAs aligned at its lower edge on the right.
- Terminal demo begins x80, y682, width1280, cyan plane; visible browser frame is inset and does not fill the plane.

At 390 × 844:

- Announcement remains 36px, navigation uses a native menu control visually, logo x20; source hero ends y301.
- Headline is 40px-ish, three lines, x20 around y149.
- Intro follows immediately with x20 gutters and a readable 24px-ish four-line description.
- CTAs stack full width at y470 and y517; demo follows at y574, browser inset16px.
- Mobile source is observed. Interactions and sections not explicitly inspected remain unverified rather than inferred as exact.

## Section composition contract

Retain the observed section sequence: navigation / wireframe hero / terminal introduction / customer logos / scale proof / use cases / alternating capability rows / SDK integrations / enterprise / unblocking features / FAQ / blog / open-source CTA / footer.

Sections should remain independently renderable, with shared tokens separate from section geometry. Feature rows alternate media side at desktop, use equal image planes and narrow text columns, and stack deliberately on mobile. FAQ uses actual disclosure semantics. CTAs should point to the original public destinations where they depend on Steel's service. A demonstration must not pretend to create browser infrastructure.

## Original extension rules (internal production mode only)

New content may reuse flat band changes, monospaced annotations, small square color markers, and broad asymmetric proof layouts. Keep the same type scale, thin rules, modest corners and open space. New sections require independent composition suited to their job; do not turn the whole language into repetitive cards. Do not display production-mode labels in product UI. Keep new copy/behavior attribution in evidence.

## Fidelity limits and final review criteria

Faithful reproduction and later new sections are separate internal modes. First compare the 1440 source viewport with the current implementation at the same size; inspect hero line lengths, y500 edge, wireframe placement, terminal y682 and typography. Then inspect the delivered 390px layout against observed source. Dynamic demos can differ by frame. Missing animation programs, source assets, exact font files, unseen menu behavior or failed asset retrieval must be listed explicitly. No pixel identity claim is justified by this direction pass.
