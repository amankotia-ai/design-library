# Reference study A, last eight posts

Research date: 2026-11-06. This companion study covers A09–A16 of the first reference batch, delegated after retrieval recovered. It uses the same evidence discipline as [study B](reference-study-b.md): actual visual observations, creator context, user preferences, and proposed implementation are distinguished.

## Access and actual review coverage

All eight public source posts and their native video attachment were recovered through X's public syndication metadata; [access-a.json](access-a.json) records each URL, source MP4, retrieval status, and metadata. Agent A owns the initial access attempts and the first eight posts. This study owns the eight assets below. Public metadata is saved in `media-a/<id>.json`; decoded assets are in `media-a/<id>-1.mp4`.

Every one of the **5,793 native decoded frames** in these eight assets was visually scanned in **62 consecutive 10×10 contact sheets** under `dense-a-b8/<id>-1/scan-sheets/`, with 220 px thumbnails. The display tool resized the 2244-pixel sheets to approximately 2048 pixels wide, and the unusually wide Leo asset's sheets to 1984 pixels. This is complete thumbnail-level coverage, not complete source-resolution inspection or playback at speed. The helper's original 4×5 `sheets/` and per-frame HTML are also present for larger-cell follow-up; only the explicitly recorded `scan-sheets/` were used for this complete scan.

Ten selected source-size stills were separately opened, eight from iamcfw and two from TasteGraph. The 4K iamcfw stills were displayed at 2048 pixels wide. Full source pixel-level finishing therefore remains uncertified. No audio listening or playback occurred; even the Leo post explicitly about sound design is analyzed visually only. Embedded text and performance/release claims are not independently validated.

The reports use zero-based source-frame indices; event boundaries are analyst estimates and times are rounded. Exact source PTS is in each asset's `frames.csv`, with no fps sampling filter. The CSV's `sheet` column refers to the original 20-cell sheets. For the alternate scan sheets, `scan-sheet index = floor(frame / 100)`, cell = `frame % 100`, reading left to right and top to bottom. Black cells after the decoded-frame count are padding. iamcfw additionally contains a real decoded black tail, distinguished below.

| Study | Source | Stream metadata | Decoded range actually scanned | 100-cell sheets |
|---|---|---|---|---:|
| A09 | [driceroland](https://x.com/driceroland/status/2117634813108650450) | 3.667 s; 30 fps; 3840×2160 | f0–109 | 2 |
| A10 | [Leo](https://x.com/leomeethewoo/status/2117274985601577088) | 42.867 s; 30 fps; 1690×1080 | f0–1285 | 13 |
| A11 | [Charles Postiaux](https://x.com/PostiauxCharles/status/2117624804664647707) | 14.467 s; 30 fps; 1920×1080 | f0–433 | 5 |
| A12 | [BenjaminUIX](https://x.com/BenjaminUIX/status/2117195000387863033) | 33.000 s; 30 fps; 1920×1080 | f0–989 | 10 |
| A13 | [iamcfw](https://x.com/iamcfw/status/2117227499944108448) | 66.840 s; 25 fps; 3840×2160 | f0–1670 | 17 |
| A14 | [icyyfx](https://x.com/icyyfx_/status/2116964927734972835) | 12.300 s; 60 fps; 1280×720 | f0–737 | 8 |
| A15 | [Karn Sarao](https://x.com/bykarnsarao/status/2116887447753871477) | 27.000 s; 15 fps; 1280×720 | f0–404 | 5 |
| A16 | [alimdesigner](https://x.com/alimdesigner_/status/2116893654329721255) | 5.300 s; 30 fps; 1920×1080 | f0–158 | 2 |

Machine-readable coverage: [review-coverage-a-tail.json](review-coverage-a-tail.json). The `manifest.json` in each directory preserves source hash and full ffprobe metadata. The frame HTML's initial extraction notice is not proof of a review; actual review state is recorded in the manifest/coverage file and this document.

## A09 — driceroland: compact brand-AI four-up reel

[Post](https://x.com/driceroland/status/2117634813108650450) · [frame atlas](dense-a-b8/2117634813108650450-1/index.html) · [PTS](dense-a-b8/2117634813108650450-1/frames.csv)

**Context:** The creator says they enjoyed making the motion. The attachment is a four-panel simultaneous reel, 3.67 seconds long; it does not establish a complete launch story or original tools.

**Observed sequence:**

- Top left, f0–30 / 0–1.0 s: overlapping white and blue webpage/brand cards grow and shift within the panel, with a large letter specimen at the lower-left edge. f31–64 / 1.03–2.13 s changes the arrangement toward the typographic specimen, then f65–109 / 2.17–3.63 s lets blue/white cards sweep back over it. The panel illustrates layered brand artifacts rather than a readable interaction.
- Top right, f0–30 / 0–1.0 s: a short brand-requirements statement types in. Around f40–60 / 1.33–2.0 s a craft-related term becomes the active item; around f60–80 / 2.0–2.67 s uniqueness becomes active; f80–95 / 2.67–3.17 s attention becomes active; f100–109 / 3.33–3.63 s iteration becomes active. Earlier words recede upward and dim. The changing active word is a vertical hierarchy, not a new camera angle.
- Bottom left, f0–25 / 0–0.83 s: a cursor-terminated branding phrase types. Approximately f28–55 / 0.93–1.83 s replaces it with a dark blue site panel, f55–70 / 1.83–2.33 s with a pale pink graphic, f70–85 / 2.33–2.83 s with a still-life/photographic composition, and f85–109 / 2.83–3.63 s with another editorial poster.
- Bottom right, f0–55 / 0–1.83 s: small app-like tiles gather around a central brand-AI label. Around f55–70 / 1.83–2.33 s the peripheral tiles disappear; the quiet central label remains to the end.

**Art and motion:** Charcoal panels, thin white dividers, and ample inner empty space provide a consistent container for varied assets. Blue belongs mainly to the layered artifact panel; the word-list panel uses luminance and position for hierarchy. The frame stays frontal; apparent depth is stack overlap and scale, not a demonstrated 3D rig.

**Skill transfer:** Use an active-word list to articulate qualities without a wall of simultaneous text. Place brand applications in depth-like overlapping layers when showing breadth. Avoid stacking this entire four-up reel into a single film scene by default: each quadrant is effectively a separate motion reference, and the 3.67-second combined board is too compressed for detailed product proof.

## A10 — Leo: Fomo web-discovery film shown with a sound timeline

[Post](https://x.com/leomeethewoo/status/2117274985601577088) · [frame atlas](dense-a-b8/2117274985601577088-1/index.html) · [PTS](dense-a-b8/2117274985601577088-1/frames.csv)

**Context:** The post explicitly concerns exploring sound design in product videos. The attachment visibly includes the film above a narrow green waveform/playhead timeline. This is evidence of an editing presentation; it does not permit conclusions about sound placement, mixing, or quality without listening. This entry studies only the visual film area.

**Observed sequence:**

- f0–28 / 0–0.93 s: a small introduction word types on a pale lavender-to-blue field. f29–69 / 0.97–2.30 s: a white linked-loop mark appears, surrounded by faint large orbital ellipses. The mark rotates/reorients as a curved wireframe horizon emerges below.
- f70–120 / 2.33–4.00 s: the identity moves down and gives way to a web-discovery heading over the wireframe hemisphere. The heading holds.
- f121–154 / 4.03–5.13 s: cut to a dark navy UI macro. Circular token/avatar icons arrive along the left edge of a list. The framing pulls/reveals more of the panel; rows, columns, and green figures become visible.
- f155–211 / 5.17–7.03 s: the whole dark list holds as a purple selection highlight moves to a lower row. The small row-associated blue disc persists while surrounding UI dims.
- f212–251 / 7.07–8.37 s: the disc transfers onto the lavender ground and visibly rotates edge-on then face-on, revealing the linked-loop symbol. It travels toward the upper-right edge as copy takes over.
- f252–299 / 8.40–9.97 s: short centered copy resolves into a second phrase. Horizontal rows slide in with long soft trailing streaks at the end of the interval.
- f300–329 / 10.00–10.97 s: many translucent rows travel horizontally, then clear. f330–414 / 11.00–13.80 s: individual token rows pass through a stable central reading band; less important adjacent rows remain soft and faint.
- f415–477 / 13.83–15.90 s: the view approaches one row, with a small amount/action control at right. The control cycles pale/darker emphasis while the row remains anchored. A restrained angled translucent light shape sits behind it.
- f478–539 / 15.93–17.97 s: cut to isolated dark-ground filter controls. Time range, market-cap, and network controls enter sequentially as the scene tracks along their horizontal arrangement, then pulls back to show them together.
- f540–639 / 18.00–21.30 s: the control group shrinks and a larger trading/list panel rises into view below it. After a reading hold, a portrait-oriented chart/detail panel arrives in front around f640 / 21.33 s; the landscape table stays behind as context.
- f640–690 / 21.33–23.00 s: the portrait detail settles with a green action at its bottom; the surrounding layout remains quieter. Around f691–744 / 23.03–24.80 s the interface clears to a small violet orb and a customization word that types beside it.
- f745–805 / 24.83–26.83 s: the orb recedes and the centered statement advances to experience-oriented copy, then holds. f806–929 / 26.87–30.97 s returns to a full panel, expands a chart, then assembles overlapping chart/detail panels with one brighter front plane.
- f930–1029 / 31.00–34.30 s: many green buy/red sell pills populate a dark field; the pills reduce into three paired green/orange bars. Labels arrive after the bars settle, turning an energetic field into a simplified metric display.
- f1030–1101 / 34.33–36.70 s: bars clear into a large familiar trading chart. The layout is now stable for reading.
- f1102–1163 / 36.73–38.77 s: a macro order form types an amount and highlights the buy action. A small branded disc emerges near the action and becomes the moving transition carrier.
- f1164–1206 / 38.80–40.20 s: the disc travels across a rising chart, accompanied by a small user/avatar marker. Its path has a visible trail; the chart supplies continuity between an action and the next view, without independently proving a financial outcome.
- f1207–1261 / 40.23–42.03 s: lavender returns; an availability statement builds and holds. f1262–1285 / 42.07–42.83 s resolves to the Fomo wordmark.

**Art, camera, and finish:** Lavender-blue identity fields alternate with dark navy operational UI. Purple marks selection/brand; green and orange/red retain conventional trading-state roles. Faint grids, translucent rows, macro UI, visible streaks, and the recurring disc bridge abstract and concrete scenes. The perspective changes are gentle; much of the effect is 2D layer movement/reframing. Source tools and genuine physical camera motion are unknown.

**Skill transfer:** A small branded object can become a transition baton across list → identity → action → chart. Reduce dense systems to one row/control before asking viewers to read. Introduce filters sequentially, then reveal their wider context. Do not infer that trading-chart motion proves a real return. Because this exact post is about sound, a later listening pass is particularly valuable; visual-only analysis must not be mislabeled as sound research.

## A11 — Charles Postiaux: dashboard in a physical monitor

[Post](https://x.com/PostiauxCharles/status/2117624804664647707) · [frame atlas](dense-a-b8/2117624804664647707-1/index.html) · [PTS](dense-a-b8/2117624804664647707-1/frames.csv)

**Context:** The creator describes Blender mockups, recorded localhost prototypes, and four rendered scenes. That is a creator pipeline claim. The pixels independently show a dark dashboard mapped into a monitor and four framing arrangements; they do not independently establish elapsed production time or exact model/tool versions.

**Observed sequence:**

- f0–89 / 0–2.97 s: a full desktop monitor sits on a neutral gray background. A cable exits toward the lower-left corner and a dark stand supports the screen. The dashboard has a prominent cyan heatmap, pale labels, and very small yellow accents. The view is mostly steady while screen content/cursor changes.
- f90–249 / 3.00–8.30 s: cut into a frontal, nearly full-screen dashboard crop. A tooltip/selection traverses different heatmap cells over the interval, exposing changing values while the surrounding charts remain as context. The meaningful action is the hover/selection on the data, not a continuing camera orbit.
- f250–299 / 8.33–9.97 s: cut back to an entire monitor at a modest three-quarter angle on gray. The monitor provides the object context missing in the data crop.
- f300–433 / 10.00–14.43 s: cut to an oblique close-up of the right/bottom charts and data table. The right screen edge and gray outside world remain visible; the chart tooltip/value changes as the pointer moves. There is no distinct final brand end card in the retrieved asset.

**Art and camera:** The cyan heatmap and sparse yellow highlights survive both straight and angled framings. Neutral surroundings prevent the mockup from competing with the data. Hard cuts vary shot scale; the physical stand, cable, edge, and perspective establish reality. There is no need to infer continuous dolly motion from a static angled shot.

**Skill transfer:** Separate establishing object shot, readable interaction shot, three-quarter context shot, and macro detail. A screen recording mapped to a physical mockup is a practical production route when the screen changes need to remain accurate. Test texture/video filtering and readability at the actual oblique angle. A beautiful monitor alone is not a product-benefit story; add the cause and effect of the dashboard action when using it in a feature film.

## A12 — BenjaminUIX: four concurrent launch-film references

[Post](https://x.com/BenjaminUIX/status/2117195000387863033) · [frame atlas](dense-a-b8/2117195000387863033-1/index.html) · [PTS](dense-a-b8/2117195000387863033-1/frames.csv)

**Context:** The post points to launch-video inspiration resources. The actual attachment is four simultaneous, substantially different films/excerpts. The underlying production authorship and full original contexts are not established by this post. It is especially important not to assign all four quadrants to one software company or invent a single whole-film arc.

**Top left, dark Google-AI-themed sequence:** f0–30 / 0–1.00 s animates an integration word into small app icons. f31–60 / 1.03–2.00 s adds app-category words and draws the icon group inward. f61–120 / 2.03–4.00 s becomes a luminous orb, then a multicolor curved form, then a small multicolor identity. f121–154 / 4.03–5.13 s holds a studio-related label. f155–219 / 5.17–7.30 s introduces a dark composer with a softly shifting colored perimeter; f220–330 / 7.33–11.00 s expands into a dark code/result window over a vivid blue/pink/orange surround. f331–439 / 11.03–14.63 s clears to a tiny green indicator and an operational statement. f440–539 / 14.67–17.97 s reveals an angled dark text panel as context; f540–579 / 18.00–19.30 s isolates an action button under a large bright cursor. f580–649 / 19.33–21.63 s introduces a pale card/dialog over a colored surround; f650–749 / 21.67–24.97 s shows an account-permission/login dialog. f750–929 / 25.00–30.97 s presents pale result forms on darker/gradient context. f930–989 / 31.00–32.97 s resolves to a small dark-ground identity. The key technique is integration icons → identity → composer → generated result → authorization, with color framing the interaction.

**Top right, pale Okara-themed sequence:** f0–45 / 0–1.50 s reveals a pale ghost/agent mark and short setup sentence; f46–100 / 1.53–3.33 s adds a row of app icons and a larger marketing-stack statement. f101–154 / 3.37–5.13 s clears to an introduction surrounded by small page fragments. f155–239 / 5.17–7.97 s resolves the Okara lockup and product-role positioning. f240–349 / 8.00–11.63 s narrows to a URL input and get-started control with a pointer. f350–439 / 11.67–14.63 s pulls out to a pale application dashboard, then zooms toward a plotted metric. f440–549 / 14.67–18.30 s alternates navigation/content panels and a centered agent-team statement. f550–649 / 18.33–21.63 s introduces multiple agent identities/icons. f650–739 / 21.67–24.63 s describes content creation while UI cards assemble; f740–829 / 24.67–27.63 s stacks specific agent panes at an oblique angle. f830–989 / 27.67–32.97 s cycles copy/story/X-style agent screens. The useful mechanism is a single entered URL expanding into a team of work-specific views, rather than a logo montage alone.

**Bottom left, image-generation/fashion sequence:** f0–59 / 0–1.97 s shows a warm pink head-like silhouette over an iridescent field; f60–95 / 2.00–3.17 s turns into a changing chart-like silhouette. f96–154 / 3.20–5.13 s clears toward minimal type and a small spatial form. f155–244 / 5.17–8.13 s expands a colorful interior/room study, then substitutes a more photographic interior with a laptop. f245–329 / 8.17–10.97 s changes to an icy/cloud-like world while a large input types a fashion-generation request. f330–439 / 11.00–14.63 s leaves the request/result context, then assembles small colored particles into a portrait. f440–579 / 14.67–19.30 s cycles fashion portraits with explicit clipped/paper-style crops. f580–649 / 19.33–21.63 s accumulates multiple figure cutouts. f650–739 / 21.67–24.63 s introduces a pale card over a saturated gradient; f740–929 / 24.67–30.97 s shows card/image variants and progressively multiplies them; f930–989 / 31.00–32.97 s clears to a quieter landscape/card. The key sequence is prompt → generated image → selected variations; thumbnail review cannot validate image provenance or text-to-image fidelity.

**Bottom right, sustainability-themed kinetic type:** f0–90 / 0–3.00 s builds a small plan statement with a green marginal annotation. f91–145 / 3.03–4.83 s moves into a strong green field and a carbon-related pledge. f146–199 / 4.87–6.63 s interrupts the green with sparse white-on-black correction/setup words. f200–309 / 6.67–10.30 s returns to green to expand a product/carbon-neutral proposition. f310–420 / 10.33–14.00 s alternates black-ground statements with simple green device outlines. f421–509 / 14.03–16.97 s continues a recycled-materials statement with green marginal annotations. f510–649 / 17.00–21.63 s presents new methods and physical material/product imagery; f650–739 / 21.67–24.63 s multiplies simple tree forms into a repeating field; f740–809 / 24.67–26.97 s turns a large green curved leaf-like form into a wipe and introduces packaging outlines. f810–889 / 27.00–29.63 s uses black copy and a large hand-drawn green emphasis/shape takeover. f890–989 / 29.67–32.97 s returns to green/pale copy and an explanatory continuation; the attachment ends midstream rather than supplying that film's final closure. The mechanism is a restricted green/black/white grammar with type scale, outlines, multiplication, and shape wipes tied to a verbal argument.

**Transfer and caution:** This post is valuable as a comparison of brand systems and shot grammars, but a four-up compilation is not a reliable measure of reading speed or attention in any one original. A new movie should choose its own clear visual grammar; copying dark AI glow, pale agent UI, iridescent fashion, and bright-green sustainability into one unmotivated style would destroy coherence. Establish provenance separately before crediting original productions or treating the excerpts as complete films.

## A13 — iamcfw: personal world, editorial breathing room, and color transitions

[Post](https://x.com/iamcfw/status/2117227499944108448) · [frame atlas](dense-a-b8/2117227499944108448-1/index.html) · [PTS](dense-a-b8/2117227499944108448-1/frames.csv)

**Context:** The caption gives a final-file-style title for cfw.market. The user explicitly loves the backgrounds and transitions. The film is a personal/work/collection showcase; it is not a conventional SaaS proof demonstration. It is a strong editorial-direction reference with selected expressive transition devices.

**Observed sequence:**

- f0–62 / 0–2.48 s: a diffuse color field fills the frame: periwinkle/lavender upper left, pale peach upper right, coral/red lower left, amber lower right, pink between. A small white introduction sentence types slowly at center. [f50](stills-a-tail/2117227499944108448-1-f50.png) preserves the broad color placement and restrained white type; the gradient supports the sentence instead of becoming a busy particle animation.
- f63–77 / 2.52–3.08 s: an off-white field wipes diagonally down from the upper-right corner. The transition edge is broken into little colored square steps/pixels that carry the old palette. The old color mass retreats toward bottom left, rather than dissolving uniformly.
- f78–209 / 3.12–8.36 s: off-white holds around small centered text. Short file/identity-style fragments change inside brace/selection-like framing. The entire background stays quiet while the text does the storytelling.
- f210–250 / 8.40–10.00 s: a compact three-row process/status list builds at center, with pink, blue, and yellow semantic labels and a thin vertical guide. [f240](stills-a-tail/2117227499944108448-1-f240.png) confirms actual title/label hierarchy and soft-gray secondary metadata.
- f251–299 / 10.04–11.96 s: small multicolor squares scatter/gather into a rectangular image field, which resolves into a framed artwork. The palette introduced at the start reappears in the transition particles.
- f300–365 / 12.00–14.60 s: a single artwork becomes a shallow overlapping stack, growing leftward while the front image remains dominant. Small flanking words contextualize the stack. The background remains off-white.
- f366–449 / 14.64–17.96 s: the image clears; compact centered provenance/collection text resumes, changing sequentially while selection handles/braces remain a motif. [f455](stills-a-tail/2117227499944108448-1-f455.png) in the following transition confirms that the handles and braces are part of the designed image, not assumed browser UI.
- f450–494 / 18.00–19.76 s: a few names/titles expand into several columns; that text field recedes into the next centered statement. f495–656 / 19.80–26.24 s: a longer work list grows and scrolls through the frame. [f650](stills-a-tail/2117227499944108448-1-f650.png) confirms color-coded square bullets and subtle duration metadata on a generous pale field.
- f657–741 / 26.28–29.64 s: an anime/image still appears, then becomes another shallow stack of varied frames, widening leftward like the earlier artwork stack. The repeated stack construction makes disparate interests feel like one system.
- f742–778 / 29.68–31.12 s: cut to nearly black. A tiny horizontal control appears, then a dark, slightly angled card enters and turns toward a frontal reading orientation.
- f779–835 / 31.16–33.40 s: a short bullish-state card holds, becomes soft, and clears.
- f836–929 / 33.44–37.16 s: a small process list and multicolor nodes appear; the nodes spread into a connected line chart. [f900](stills-a-tail/2117227499944108448-1-f900.png) shows a thin gray connecting line, green/red/amber/lilac points, and sparse timeline labels. The chart's colored nodes relate to the earlier status bullets.
- f930–981 / 37.20–39.24 s: a dark message/card returns at an oblique angle and additional lines arrange through depth-like layering, flanked by tiny contextual words.
- f982–1009 / 39.28–40.36 s: hard cut to pale gray; a tiny vertical mark expands into a white square card with a subtle contact shadow.
- f1010–1094 / 40.40–43.76 s: the card reveals a typographic face. A little legend grows to its right while eyes and mouth change expression. [f1040](stills-a-tail/2117227499944108448-1-f1040.png) confirms a restrained square character built from simple black glyphs, pale surfaces, and pink/blue legend chips. The scene changes character state without moving the entire camera.
- f1095–1220 / 43.80–48.80 s: the character clears back to centered collection/provenance phrases. f1221–1271 / 48.84–50.84 s: many faint list columns spread behind a short central quantity statement, supplying scale while the middle stays readable.
- f1272–1294 / 50.88–51.76 s: a small selected gradient square appears; it becomes the artwork thumbnail of a horizontal music/player card.
- f1295–1354 / 51.80–54.16 s: the player grows across the frame, with track-title and control states changing. Around f1355–1388 / 54.20–55.52 s the colored thumbnail itself expands until it becomes a large gradient player page. [f1380](stills-a-tail/2117227499944108448-1-f1380.png) shows a peach/pink/lilac field, large black track title at left, a narrow playlist at right, and precise typographic controls. The background transition is literally an object changing scale and role.
- f1389–1470 / 55.56–58.80 s: player content fades under a softer moving warm-color field. A short art/markets/ideas positioning statement types centrally and holds.
- f1471–1560 / 58.84–62.40 s: a small centered site statement builds over the warm/pink/white field, with white selection handles. [f1490](stills-a-tail/2117227499944108448-1-f1490.png) preserves the shift to orange at left/bottom, pink at center/right, and a pale top edge.
- f1561–1591 / 62.44–63.64 s: cut to pale gray and a small face/site lockup types in, then holds briefly. The remaining decoded tail is black; it should not be confused with the atlas's black padding cells or automatically copied as an intentional design requirement.

**Why the user's preferred backgrounds work:** The colors have wide soft regions, a stable warm/cool relation, and a limited role. Bright backgrounds open and close the personal world; pale scenes permit exact information; a dark chapter signals a change of subject; a square gradient asset later expands into the environment. The pixel wipe keeps a visible connection between outgoing and incoming fields. Palette continuity survives changes in medium: gradient → tiny colored squares → list chips → graph nodes → gradient thumbnail. Most camera-like behavior is frontal scaling, shallow stack perspective, and typography; the emotional rhythm comes from negative space and selective color, not nonstop orbiting.

**Transfer:** Plan background state as part of every shot, including outgoing and incoming edge behavior. Design a palette script across the whole film. Reuse color roles in small UI details so the full-bleed scenes feel earned. A surface or thumbnail becoming the next scene's background is a strong continuity device when the subject genuinely persists. The exceptionally small type in the source needs a readability review for mobile deliverables; taste in negative space does not mean every new film should inherit its type size.

## A14 — icyyfx: fashion search with 2D reframing

[Post](https://x.com/icyyfx_/status/2116964927734972835) · [frame atlas](dense-a-b8/2116964927734972835-1/index.html) · [PTS](dense-a-b8/2116964927734972835-1/frames.csv)

**Context:** The user notes that the movements can be done with GSAP. This is a plausible implementation direction for the visible 2D motion, not verified evidence that GSAP created the source. The clip includes a separate creator-credit ending.

**Observed sequence:**

- f0–28 / 0–0.47 s: a glowing blue word rises from below on black, stretches/settles, and loses most of its glow. f29–45 / 0.48–0.75 s cuts/flashes to a very pale ground and resolves a short style question beside scattered small clothing/avatar tiles.
- f46–119 / 0.77–1.98 s: the question and small tile arrangement hold with tiny positional changes. f120–134 / 2.00–2.23 s begins a cool-blue ground shift and enlarged movement toward a selected tile.
- f135–192 / 2.25–3.20 s: one clothing/person card becomes the center of attention, with stacked translucent frame outlines around it. The card grows while its surrounding image area clears.
- f193–219 / 3.22–3.65 s: a fast horizontal pan/reframe leaves the image and finds a rounded pale prompt bar near the right edge.
- f200–299 / 3.33–4.98 s: the request types progressively; the bar's height grows when the phrase wraps, while the pointer remains below. Text becomes complete before the submit action.
- f300–319 / 5.00–5.32 s: completed prompt holds. f320–369 / 5.33–6.15 s: a push/reframe moves to the dark circular submit button; it expands/settles from a little dark ellipse into a clear arrow control. The pointer approaches and a pressed/hover-style change follows.
- f370–399 / 6.17–6.65 s: the UI recedes, then a streaked transition carries attention toward a right-side list of clothing results.
- f400–529 / 6.67–8.82 s: a left headline stays stable while a vertical right-hand column of product thumbnails and labels scrolls; the headline advances into a concise consolidation statement. Thumbnail labels are too small here for reliable exact transcription.
- f530–539 / 8.83–8.98 s: the results clear with brief trailing blur. f540–648 / 9.00–10.80 s: a black brand wordmark holds on a pale ground.
- f649–737 / 10.82–12.28 s: separate black-background creator credit enters huge, then shrinks and holds. This is a credit/taste marker, not the demonstrated product's end card.

**Art and transfer:** Pale blue/white, black text, soft frame shadows, rounded prompt geometry, and clothing images carry most of the film. The only large glow is in the opening; readable product phases are much quieter. Most visible moves can plausibly be modeled with translation, scale, opacity, letter/line reveal, UI state, and selective motion blur. Use deterministic GSAP timelines if choosing that backend, but do not claim it automatically reproduces the source's blur/filter finish. The narrative is coherent: style need → selected example → request → submit → relevant results → brand.

## A15 — Karn Sarao: TasteGraph, collage and stepped motion

[Post](https://x.com/bykarnsarao/status/2116887447753871477) · [frame atlas](dense-a-b8/2116887447753871477-1/index.html) · [PTS](dense-a-b8/2116887447753871477-1/frames.csv)

**Context:** The user highlights cleanliness, stop-motion qualities, and generating assets with an image model. The actual downloaded source is **15 fps** and shows cutout elements changing in discrete increments. That supports a stepped-looking motion observation; it does not prove physical stop-motion capture, generated assets, or any particular image model.

**Observed sequence:**

- f0–20 / 0–1.33 s: small taste-oriented copy builds at center over a near-brown ground with faint large circles. There is no busy camera move behind the opening sentence.
- f21–49 / 1.40–3.27 s: cut to white; a jagged green cutting-mat shape becomes a collage stage. A cropped pair of eyes, painting, tennis racket, globe, architecture, small pinned portrait, paper scraps, and circular newsprint cutouts arrive in steps. [f44](stills-a-tail/2116887447753871477-1-f44.png) confirms distinct raster/cutout edges, physical cutting-grid imagery, deliberate overlap, and a mix of close/wide object scales.
- f50–61 / 3.33–4.07 s: a white profile/head silhouette and starburst rapidly enlarge to cover the collage, then resolve as one small centered head on brown. The same silhouette becomes a recurring asset.
- f62–94 / 4.13–6.27 s: a white left half-panel carrying a dark review/input card enters beside the head on the brown right half. Both halves settle long enough to compare.
- f95–128 / 6.33–8.53 s: an illustrated mountain landscape expands over the center, a high-contrast monogram flickers/changes scale, then an orange leaf-like asset and brand name appear. A poster/sticker pops onto the landscape and grows.
- f129–149 / 8.60–9.93 s: macro view of the poster's corner/control; an outline bookmark/heart-like state becomes filled as the background shifts toward a purple-tinted mountain field.
- f150–178 / 10.00–11.87 s: a broad blue design canvas contains the poster, palette swatches at left, descriptive copy at right, and a tiny bottom tool group. A greatly oversized pointer briefly passes through, then the canvas rests.
- f179–204 / 11.93–13.60 s: cut back to brown. The poster is dragged toward a white composer; a review request types into it. The poster becomes the object being evaluated, preserving context across the editorial collage and software UI.
- f205–224 / 13.67–14.93 s: a small dark step list appears; selection advances and the view moves close to the active review stage before pulling back.
- f225–249 / 15.00–16.60 s: split composition, poster left on white, review text right on black. Lines/guides cross the poster and blue overlays take it toward a revised palette. [f236](stills-a-tail/2116887447753871477-1-f236.png) confirms the simultaneous artifact and explanatory review. The prose inside the example is source content, not an independently validated design diagnosis.
- f250–276 / 16.67–18.40 s: a quiet brown editorial layout pairs a left image with a right vertical inspiration list. Rapid image replacements, active-row luminance, and a small triangular marker communicate selection without changing the layout.
- f277–309 / 18.47–20.60 s: a frosted/translucent horizontal composer passes across an embossed pale rectangular artwork; a push isolates its right action control and oversized cursor. The action receives a violet emphasis.
- f310–344 / 20.67–22.93 s: the composer holds low while moodboard tiles populate the open brown field above in staged groups. The board is visibly an output of the action.
- f345–380 / 23.00–25.33 s: repeated outline/solid head silhouettes fill rows around central copy, then clear. The central statement stays readable as the perimeter becomes dense.
- f381–404 / 25.40–26.93 s: the monogram resolves and reduces into the TasteGraph wordmark on brown for the final hold.

**Art and rhythm:** Brown/off-white is the home palette; cutting-mat green, mountain blue/yellow, violet, paper images, and dark review UI are controlled insertions. The collage looks tactile through explicit clipping, physical image subjects, paper edges, and overlap; it does not require fully simulated camera optics. Many changes are object substitutions or stepped placements, which differ from continuously interpolated, spring-heavy UI motion. Stable layouts provide continuity around those abrupt changes.

**Transfer:** For the editorial direction, create an asset family with consistent cutout quality, lighting, texture, edge treatment, and intended scale; image generation is one optional way to produce it, not a substitute for art direction. Keep action and output connected by carrying the same poster into the review and the resulting moodboard. Choose an intentional motion cadence for each layer; do not lower the whole final export frame rate simply to create accidental judder in typography. If recreating stepped animation at a higher delivery rate, hold selected scene states deterministically and inspect transitions at speed.

## A16 — alimdesigner: nine-panel monthly recap

[Post](https://x.com/alimdesigner_/status/2116893654329721255) · [frame atlas](dense-a-b8/2116893654329721255-1/index.html) · [PTS](dense-a-b8/2116893654329721255-1/frames.csv)

**Context:** The post is a personal monthly recap listing milestones and a move. The attachment is a **3×3 simultaneous collage**, with six design/motion panels above three talking-head panels. It is a portfolio/recap composition rather than one software product narrative. Caption milestones are source claims, not verified analytics.

**Observed sequence by panel:**

- Top left: f0–30 / 0–1.00 s assembles dark architectural line work on off-white; f31–70 / 1.03–2.33 s adds small explanatory copy and holds the architecture composition.
- Top middle: f0–45 / 0–1.50 s expands a small white panel and types a centered personal name; f46–115 / 1.53–3.83 s holds; f116–145 / 3.87–4.83 s clears/reveals another pale section with small objects.
- Top right: blue/white product/landing composition persists, with a pointer and tall white screen/document objects. The pale-blue treatment separates it from the mostly white neighboring panels.
- Middle left: small page/card rows shift/reorder in approximately f0–45 / 0–1.50 s; later pale spreadsheet/column-like states replace them, then card rows return.
- Middle middle: a purple particle-like field forms a low terrain/wave around f0–70 / 0–2.33 s and continues pulsing as a coherent mound rather than scattering into the neighboring panels.
- Middle right: paragraph-like gray type gives way to a lighter UI/data arrangement around f60 / 2.00 s; later elements spread horizontally into a wider interface-like row.
- Bottom row: three differently framed talking-head clips remain in fixed cells throughout. The people gesture/change facial state. No claim about what they say or how they sound is made.
- Around f45–80 / 1.50–2.67 s, a large follower/milestone-style counter rises to 7,000 in the bottom-right clip and holds. Around f80–110 / 2.67–3.67 s colored labels/cards appear around the left talking head. The final seconds continue the concurrent panels; no whole-frame end card appears.

**Art and transfer:** Uniform dividing lines and fixed geometry make diverse outputs legible as a body of work; mostly pale design panels contrast with human footage along the bottom. The grid itself is the editorial system. Borrow this format for a recap, comparison, or portfolio proof board where simultaneous variety is intentional. For a single launch argument, isolate the relevant panel, enlarge it, and give its action a narrative role instead of relying on nine small independent stories to explain the product.

## Additional skill-ready mechanisms from these eight

| Category | Mechanism | Evidence | New-film use |
|---|---|---|---|
| Reference literacy | Detect montage geometry and source boundaries first | A09 four-up; A12 four unrelated concurrent films; A16 nine-up | Annotate each panel independently and preserve original source uncertainty. |
| Editorial story | Introduce a specific personal/product world through a restrained sentence, then reveal examples | A13 f0–365 | Let the opening create curiosity before the artifact gallery expands. |
| Palette script | Wide diffuse color regions can bookend quiet pale and dark information chapters | A13 f0–77, f742–981, f1272–1560 | Assign color states to meaning across the film rather than decorating isolated shots. |
| Background transitions | Carry outgoing color through a broken/pixel edge | A13 f63–77 | Define edge geometry, travel direction, old/new coverage, and settle explicitly. |
| Background transitions | Turn a real foreground thumbnail/surface into the next background | A13 f1272–1388 | Preserve scale/position continuity so the environment change has an identifiable source. |
| Material/asset direction | Cutout collage gains character from curated physical subjects and explicit edges | A15 f21–49 | Create an asset bible; matching edge/shadow/texture matters more than generating many unrelated images. |
| Timing | Stepped substitutions and held states are a different language from continuous easing | A15 15 fps asset, especially f21–61 and f250–276 | Choose cadence per layer and test at final playback speed. |
| Narrative proof | Carry one artifact through selection → review → revised output | A15 f129–249, then f310–344 | Reuse the same poster/document/data so results feel caused by the demonstrated action. |
| UI action | Finish typing, then approach/activate the submit control, then show results | A14 f200–529 | Avoid conflating setup, click, and result in one unreadable movement. |
| UI cinematography | Use a full monitor for context and a direct screen crop for evidence | A11 f0–89 versus f90–249 | Physical beauty and UI readability can be separate shots. |
| Attention | Dense repeated items can simplify into one useful metric | A10 f930–1029 | Transition from many items to a chart/bar only if the relationship is meaningful and truthful. |
| Typography | Muted prior items and bright active items produce a clear evolving list | A09 top-right; A15 f205–224/f250–276 | Keep a stable reading band and make the active step unambiguous. |
| Implementation | Most flat framing can be expressed as deterministic transform/mask/type state | A14, plus frontal A13 scenes | GSAP or another scene timeline is plausible; source software and speed are not proven by visual resemblance. |
| Review | Treat sound-focused posts as a distinct listening obligation | A10 | A waveform image cannot establish the sound; mark listening unreviewed until it happens. |

The mechanisms above are interpretations, not prescriptions to copy a look wholesale. The new film's audience, argument, desired duration, brand, and required proof determine which mechanisms deserve inclusion. A completed movie still needs playback, listening, native-resolution typography/edge/gradient checks, and factual review; this report does not claim those passes occurred.
