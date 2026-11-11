# Reference study B: 16 posts, 18 video assets

Research date: 2026-11-06. This is a source-specific visual study for the software film skill. It separates observed images from creator context, the user's preferences, and implementation proposals. It is not a claim about the creators' actual tools.

## Evidence and coverage

All 16 assigned posts were resolved to public X syndication metadata and their public video variants. Alex Aperios's post contains **three** distinct clips; Peer Richelsen's post contains **a quoted post's** Linear film rather than its own native attachment. There are 18 decoded assets, **14,043 decoded frames**, and **146 consecutive-frame contact sheets**. Every contact sheet was opened and visually scanned, covering frame 0 through each asset's final decoded frame. This is an every-frame **thumbnail scan**, not playback at speed or full-resolution inspection of every frame.

The scan used 10×10 contact sheets, one cell per consecutive decoded frame, usually 180 px wide and 220 px for some short clips. Black empty cells at the end of a sheet are padding, not source frames. A few individual full-size decoded stills were also opened; those are listed in the coverage JSON and linked below. Tiny UI text, subtle grain, compression, detailed focus, and single-pixel edge quality cannot be certified from the thumbnail scan. No audio was listened to. Consequently this study makes no observations about music, voice performance, sound design, beat synchronization, mix, or audio quality. It does not certify playback smoothness. The embedded audio streams were only detected as metadata.

Frame numbers are zero-based and inclusive in the analyst notes. Time ranges are rounded for navigation and the event boundaries are visually estimated; they are not a machine-certified edit decision list. The **exact presentation timestamp for every frame** is in the corresponding `frames.csv`. Use that file for frame-accurate reconstruction, especially for the nominal 23.976/29.97 fps clips. A complete frame index does not mean the analysis describes every unchanged frame individually; holds are grouped explicitly.

Evidence files:

- [Access ledger and public asset URLs](access-b.json), [retrieval script](fetch-b.py), and original JSON responses under [media-b](media-b/).
- Each `dense-b/<post-id>-<media-index>/` has `index.html`, `manifest.json`, `frames.csv`, individual frames, and all consecutive sheets. The manifest includes the source SHA-256 and ffprobe metadata.
- [Machine-readable actual review coverage](review-coverage-b.json).
- [Selected native-size stills](stills-b/). These supplement, rather than replace, the full-frame thumbnail coverage.

## Individual access ledger

For **each** URL below, the normal X webpage was first attempted through web access and failed with cache-miss or HTTP 403 behavior. A shell attempt inside the network-restricted sandbox also could not resolve the host. A subsequently approved read-only network request to `cdn.syndication.twimg.com/tweet-result?id=<id>&lang=en&token=a` retrieved the post metadata; the highest listed MP4 bitrate was downloaded from its public `video.twimg.com` URL. These are access-path failures followed by successful media recovery, not missing references.

| Study | Source post | Retrieved assets | Video stream duration / frame count / dimensions | Consecutive sheets scanned |
|---|---|---:|---|---:|
| B01 | [Steve Lauda](https://x.com/stevelauda_/status/2116874214133350667) | 1 | 6.533 s; 196; 1920×1080; 30 fps | 2 |
| B02 | [dipvizz](https://x.com/dipvizz/status/2116487154801254831) | 1 | 6.507 s; 195; 1920×1080; 30000/1001 fps | 2 |
| B03 | [Pratham Raj](https://x.com/PrathamRaj36466/status/2116442307172114718) | 1 | 32.100 s; 963; 1920×1080; 30 fps | 10 |
| B04 | [Leo](https://x.com/leomeethewoo/status/2116150784194924798) | 1 | 12.900 s; 387; 1920×1080; 30 fps | 4 |
| B05 | [madtirth](https://x.com/madtirth/status/2113945989212148214) | 1 | 23.200 s; 696; 1920×1080; 30 fps | 7 |
| B06 | [Joe Self](https://x.com/JoeSelf_1/status/2115786794713440671) | 1 | 16.433 s; 493; 1280×720; 30 fps | 5 |
| B07 | [Remy Godet](https://x.com/remy_godet/status/2115445301725335578) | 1 | 35.380 s; 1769; 1280×720; 50 fps | 18 |
| B08 | [anugrah](https://x.com/anugrahthegoat/status/2115140975966454087) | 1 | 5.000 s; 150; 1920×1080; 30 fps | 2 |
| B09 | [Jay](https://x.com/jayndeau/status/2115433629182492788) | 1 | 30.900 s; 1854; 1940×1080; 60 fps | 19 |
| B10 | [Vadim Carazan](https://x.com/VadimCarazan/status/2115414518910111794) | 1 | 30.000 s; 1800; 1920×1080; 60 fps | 18 |
| B11 | [flamefxi](https://x.com/flamefxi/status/2114697201473720711) | 1 | 5.088 s; 122; 1280×720; 24000/1001 fps | 2 |
| B12 | [Ayush Soni / Tensorlake](https://x.com/ayushsoni_io/status/2113490687912264068) | 1 | 7.000 s; 420; 3840×2040; 60 fps | 5 |
| B13 | [Alex Aperios](https://x.com/AlexAperios/status/2112576405343236283) | 3 | 10.000 s / 600 frames each; first 1080×1920, others 1080×1440; 60 fps | 6+6+6 |
| B14 | [TJ Cages / AutoRouter](https://x.com/tjcages/status/2110838619078557910) | 1 | 16.833 s; 1010; 1920×1080; 60 fps | 11 |
| B15 | [Ayush Soni / graph](https://x.com/ayushsoni_io/status/2110034769685962919) | 1 | 10.500 s; 630; 2040×2040; 60 fps | 7 |
| B16 | [Peer Richelsen](https://x.com/peer_rich/status/2107856619979579679) | 1 quoted | 51.933 s; 1558; 1920×1080; 30 fps | 16 |

Container durations can differ slightly from video-stream durations or tweet metadata due to audio tails and muxing. This table uses decoded video-stream information. B16's actual film source is [Karri Saarinen's Linear post](https://x.com/karrisaarinen/status/2107676903553585155); the local filename preserves the user's supplied parent-post ID. No authorship of the film is attributed to Peer.

## B01 — Steve Lauda: Tracelight primitive-to-brand-to-UI

[Source](https://x.com/stevelauda_/status/2116874214133350667) · [every-frame atlas](dense-b/2116874214133350667-1/index.html) · [exact frame timestamps](dense-b/2116874214133350667-1/frames.csv)

**Context:** The creator describes an exploration. The user's annotation highlights element transformation. This is a short identity/UI transition study, not a complete product story with a demonstrated outcome.

**Observed sequence:**

- f0–7 / 0–0.23 s: a small dark-green block sits in a very large white field. The opening establishes a deliberately tiny focal point.
- f8–25 / 0.27–0.83 s: the seed becomes four separated cuboid-like pieces arranged in a square; there is a short legibility hold after separation.
- f26–43 / 0.87–1.43 s: pieces converge and rotate into a ring-like assembly around negative space. The settled silhouette precedes the next change.
- f44–67 / 1.47–2.23 s: the assembly tips/flattens toward a frontal striped/checkered mark. Construction guides become visible. [f60](stills-b/2116874214133350667-1-f60.png) confirms dashed horizontal and vertical guides, alternating green/white strips, and rounded internal corners.
- f68–104 / 2.27–3.47 s: serif wordmark letters reveal beside the mark, then the completed lockup holds. The grid-guided symbol gives way to a much quieter brand frame.
- f105–139 / 3.50–4.63 s: a full green background replaces the white field. A large white composer appears partly outside the frame before reframing into an angled product plane. Edges blur during motion.
- f140–173 / 4.67–5.77 s: pointer and composer details carry attention. [f145](stills-b/2116874214133350667-1-f145.png) still shows the placeholder, not a finished submitted prompt; layered white edges, green send control, and pale shadowing give the plane thickness.
- f174–195 / 5.80–6.50 s: the composer recedes toward the center. No task-result payoff is shown before the clip ends.

**Art, camera, and finish:** White/forest green gives the geometry uninterrupted contrast; the serif identity differs from the functional sans-serif UI. Apparent depth comes from object rotation/perspective, layered UI edges, soft shadow, and a visibly textured green field. The exact balance of camera movement versus object transformation cannot be recovered from pixels alone. The source does not prove a single continuous mesh morph.

**Transfer to the skill:** Create a persistent primitive with a reason to survive each transformation: seed → symbol → lockup → functional object. Put a short settled silhouette between changes. Reserve the largest scene-scale change for the transition from identity to product. In a full launch film, continue this study into a concrete action and result; the visual flourish alone supplies no product proof.

## B02 — dipvizz: four simultaneous explanation motifs

[Source](https://x.com/dipvizz/status/2116487154801254831) · [atlas](dense-b/2116487154801254831-1/index.html) · [timestamps](dense-b/2116487154801254831-1/frames.csv)

**Context:** The post advertises editing work. The user noted concept explanation and panning. The retrieved attachment is a four-quadrant showreel: the panels are simultaneous, not four successive acts of one narrative.

**Observed sequence by quadrant:**

- Top left: f0–60 / 0–2.0 s, a long purple usage/progress bar decreases while small participant symbols remain as context. It resets and decreases again later. The meaningful change is bar state, not camera travel.
- Top right: f0–75 / 0–2.5 s, curved connections converge from avatars toward a purple processing node. Around f76–100 / 2.5–3.3 s the node becomes a dominant purple circle; around f135–155 / 4.5–5.2 s the sequence presents a pale output endpoint. The directional path makes input, operation, and result distinguishable.
- Bottom left: f65–135 / 2.2–4.5 s, a sparse row grows into repeated rows. Density is added incrementally, giving an intelligible accumulation rather than a single sudden wall of data.
- Bottom right: an initial 2×5 purple participant grid grows in apparent scale around f47–70 / 1.6–2.3 s. Around f118–135 / 3.9–4.5 s a gray/lime interruption accompanies replacement by a landscape/photo hero with overlaid copy. That final image holds through the end.

**Art and camera:** Black, near-white, purple, thin separators, and rounded small components bind the panels. The panning effect in the graph comes from following a spatial relationship, whereas the bottom-right change is an expansion/replacement. A 2D scene translation and scale could reproduce much of this; a 3D camera is not established.

**Transfer:** Use a single functional accent to tie actors and process states together. When showing a system, reveal source → connection → processor → result in a traceable direction. For a finished film, normally stage one quadrant's concept at a time or explicitly design a multi-panel comparison; borrowing four simultaneous loops as one story would split attention.

## B03 — Pratham Raj: Ramp expense-system explainer

[Source](https://x.com/PrathamRaj36466/status/2116442307172114718) · [atlas](dense-b/2116442307172114718-1/index.html) · [timestamps](dense-b/2116442307172114718-1/frames.csv)

**Context:** The post offers sound assets, but sound has not been reviewed. The visual sequence uses Ramp branding; the post alone does not establish official commissioning or production tools.

**Observed sequence:**

- f0–35 / 0–1.17 s: a lime opening label shrinks within a black grid. The viewer first sees the headline, then the system surrounding it.
- f36–76 / 1.20–2.53 s: grid cells cascade from dark to light, creating a white field with floating monetary amounts and a small centered statement. The grid itself carries the transition.
- f77–188 / 2.57–6.27 s: black returns. Expense-category icons and transaction rows accumulate; very large outline disorder copy scales down, followed by another status word and scattered icons. The increasing visual disorganization supplies the problem.
- f190–235 / 6.33–7.83 s: thin construction lines form the brand symbol, which settles as solid lime. The order/disorder contrast is enacted geometrically.
- Approximately f230–333 / 7.67–11.10 s: white/lime light replaces the black board. A centered platform statement builds typographically; glyph/currency substitutions lead into finance positioning.
- f335–424 / 11.17–14.13 s: black grid and workflow heading introduce an icon-node diagram. Apparent panning follows the flow horizontally into later approval stages.
- f425–493 / 14.17–16.43 s: a white receipt is framed by lime scan corners; a luminous band travels down it. The receipt becomes line art and recedes. [f450](stills-b/2116442307172114718-1-f450.png) shows the scan at the lower edge, readable item rows, and separate corner brackets.
- f494–599 / 16.47–19.97 s: a brief typographic transition leads to a lime memo-like object; copies spread horizontally, then compress into a strip under an integration statement. Small intermediate words are not reliably legible at contact-sheet scale.
- f602–729 / 20.07–24.30 s: on white, a black card rotates from a narrow edge toward its face. Category tags and a Slack-style notification appear around it. The scene pushes/reframes toward the notification and the cursor follows that destination.
- f732–794 / 24.40–26.47 s: oversized moving headline fragments resolve into a smaller centered capture-anywhere statement. High speed is followed by a reading hold.
- f795–920 / 26.50–30.67 s: a central brand node gathers expense-related satellites, then a white brand/list layout cycles feature categories.
- f921–962 / 30.70–32.07 s: full lime field, black brand lockup, final hold.

**Art and narrative:** Restrained black/white/lime holds together receipts, card materials, node diagrams, and type. The strongest story mechanism is scatter → organize → scan → integrate → access elsewhere. The receipt scan is a literal process demonstration within a stylized environment. Technical black boards and white product beauty frames alternate, making each feel distinct.

**Transfer:** Tie motion to verbs and evidence. Follow the workflow direction instead of orbiting decorative UI. A large type transition needs a settled readable result. Use the same color to mark a useful operation across different scenes. Product claims and receipt data would need verification in any new film; the reference's style is not factual evidence for another product.

## B04 — Leo: unused EthenaPay shot board

[Source](https://x.com/leomeethewoo/status/2116150784194924798) · [atlas](dense-b/2116150784194924798-1/index.html) · [timestamps](dense-b/2116150784194924798-1/frames.csv)

**Context:** The creator identifies these as unused shots for EthenaPay. The user highlights art direction and visual quality. They are four simultaneously playing shot studies, not the final published film or a complete narrative.

**Observed sequence:**

- Top left: f0–50 / 0–1.67 s, large dollar-oriented type and a coin form occupy a charcoal field; the type briefly enlarges before settling. f51–110 / 1.70–3.67 s, a coin turns through a side view, with a dark curved support/ring and a small green numerical accent. Around f110–155 / 3.67–5.17 s the identity lockup holds. After f160 / 5.33 s multiple coins stream into a new short statement; the motif repeats later.
- Top right: f0–53 / 0–1.77 s, a silver coin rolls/rotates across an oblique metal plane. f54–115 / 1.80–3.83 s, a broad circular silhouette gives way to staggered columns of coins. Specular edges communicate the thin discs. f116–142 / 3.87–4.73 s shows angled coin movement in depth, then the plane composition returns.
- Bottom left: a loose numeral arrangement coalesces into a phone-like keypad by about f15 / 0.50 s. f61–95 / 2.03–3.17 s substitutes a large amount for the keypad. f96–140 / 3.20–4.67 s brings a green rounded transaction confirmation. The keypad/amount cycle returns after about f150 / 5.00 s.
- Bottom right: a coin on a curved black surface faces the viewer, recedes/replaces into a coin shower around f60–115 / 2.00–3.83 s, then a pale pill confirmation appears on a dark blue/charcoal band. The coin setup returns around f145 / 4.83 s and cycles.

**Art, camera, and finish:** Dark objects are separated from dark backgrounds by controlled rim/specular highlights, soft gradients, and changes of curvature. Green is concentrated on earning/confirmation cues rather than filling every surface. The UI and coins share one material/light world. Coin rotation and object translation are visible; the pixels alone do not identify whether the camera itself moves.

**Transfer:** Define lighting, metal roughness, dark-value separation, and functional color before building separate shots. Borrow the coherent material vocabulary and contrast discipline. Use actual geometry/lighting when specular behavior and edge thickness carry meaning; flat CSS shadows will not automatically recreate this result. Do not adopt financial yield copy or treat unused experiments as an approved full-film structure.

## B05 — madtirth: AutoBot responsibility explainer

[Source](https://x.com/madtirth/status/2113945989212148214) · [atlas](dense-b/2113945989212148214-1/index.html) · [timestamps](dense-b/2113945989212148214-1/frames.csv)

**Context:** The posting author praises an explainer; authorship of the underlying work is unestablished. The visual story introduces autonomous coworkers through responsibility, goals, tools, budget, permissions, watching, and action.

**Observed sequence:**

- f0–70 / 0–2.33 s: an extremely oblique elliptical grid/radar grows toward a more frontal round board. Glowing mint perimeter icons arrive while a lower sentence builds. Tilting the board reveals its organizational structure.
- f70–99 / 2.33–3.30 s: a radar-like sweep and yellow time-oriented copy turn the circle into an ongoing-work metaphor.
- f100–136 / 3.33–4.53 s: a Slack-like panel drops/expands from above and gains messages. This changes from abstract promise to a recognizable workplace artifact.
- f137–184 / 4.57–6.13 s: violet orbital ellipses sweep in as the panel recedes; the ellipses flatten and contract toward an orb.
- f185–219 / 6.17–7.30 s: mint pixel-like bot marks cycle inside a violet ring. f220–327 / 7.33–10.90 s: a vertical role list moves quickly, decelerates, and selects one responsibility; surrounding list items dim.
- f328–389 / 10.93–12.97 s: a short monospaced goal types in, followed by recognizable tool toggles. The role has become a concrete goal with tools.
- f390–451 / 13.00–15.03 s: apparent pullback reveals the content inside a CRT-like device on a pale ground; a budget dial appears and holds.
- f452–484 / 15.07–16.13 s: permissions are listed as scoped actions with toggles. This is a distinct stage after the goal and budget, rather than a single overloaded screen.
- f485–540 / 16.17–18.00 s: the device compresses into a violet beam; paths/orbits grow from it around the central mint bot.
- f541–610 / 18.03–20.33 s: a pink target appears and becomes the destination of an apparent push/pan. Lower copy describes watching and selecting work.
- f611–690 / 20.37–23.00 s: the target gains a status/capsule; the path advances and the active node changes toward yellow. The last few frames begin another device shot.

**Art and story:** Mint marks the worker, violet marks its operating space, pink marks an attention target, and yellow marks time/completion. Technical labels and a gridded orbital world remain coherent while physical and abstract forms interchange. The camera-like changes coincide with changes of conceptual scale: organization → one worker → one responsibility → scope → one event.

**Transfer:** Assign each metaphor a specific verb or constraint. Storyboard responsibility, goal, tools, authority, cost, input, decision, and output separately. A generic glowing orb is insufficient unless the surrounding system explains what it does. Labelled scope/budget screens earn a quiet reading interval. GPU curves and selective bloom are possible implementation choices, not proven source tools.

## B06 — Joe Self: Figma motion-process recording

[Source](https://x.com/JoeSelf_1/status/2115786794713440671) · [atlas](dense-b/2115786794713440671-1/index.html) · [timestamps](dense-b/2115786794713440671-1/frames.csv)

**Context:** A screen recording of a Figma workspace is directly visible. The creator's caption associates Figma agent and motion, but this does not establish an export/render pipeline. It is a process/prototype reference.

**Observed sequence:** The full application frame remains locked. Timeline and panels stay visible. Inside the artwork, a narrow chevron-pattern strip sits at left, a dominant orange field carries a vertically stacked set of colored word pills, and a yellow typographic region remains at right. f0–39 / 0–1.30 s largely establishes the arrangement. f40–145 / 1.33–4.83 s, the pill stack moves upward while individual pills change width/scale near a central active band. The stack then reverses/overshoots around f150 / 5.00 s. f150–260 / 5.00–8.67 s cycles down and upward; f270–360 / 9.00–12.00 s cycles the active label again; f360–492 / 12.00–16.40 s repeats the motion rather than introducing a new story scene.

**Art and motion:** Colored pills retain consistent radii and recognizable colors while the focal item changes size. The focal band acts like a vertical carousel: scale, width, and position are coupled. The mostly stable orange ground keeps the bright colors related; the decorative stripe counterbalances dense typography.

**Transfer:** Animate active-item importance through coordinated position/width/scale rather than moving every label equally. Design the inactive items as context. Keep the canvas camera stable for a motion test that asks the viewer to compare component behavior. Do not turn editor chrome or a repeated prototype loop into the default format of a finished software launch film.

## B07 — Remy Godet: Bitstack identity film

[Source](https://x.com/remy_godet/status/2115445301725335578) · [atlas](dense-b/2115445301725335578-1/index.html) · [timestamps](dense-b/2115445301725335578-1/frames.csv)

**Context:** The creator identifies a new Bitstack identity presented in motion. This is a whole identity film mixing type, brand applications, rendered objects, and app UI.

**Observed sequence:**

- f0–84 / 0–1.68 s: a giant black word is cropped by yellow frame edges, then rapidly reduces into a small complete statement. Scale first supplies impact, then readability.
- f85–155 / 1.70–3.10 s: large speed-oriented typography rises/warps on white; a tightly cut succession of finance and directional symbols crosses yellow, black, and muted mint grounds.
- f156–214 / 3.12–4.28 s: short lines assemble into a savings proposition, with arrows and a Bitcoin-like glyph participating in the typography.
- f223–328 / 4.46–6.56 s: outlined wordmark construction and vector handles appear at enormous scale; the view tracks across letter geometry on alternating dark/mint fields.
- f329–390 / 6.58–7.80 s: the finished wordmark sits centered on yellow. This is a deliberate breather after construction.
- f391–530 / 7.82–10.60 s: a tiny opening phrase expands into large stacked era/savings copy with globe/arrow forms embedded in the composition.
- f531–616 / 10.62–12.32 s: rapid rounded-rectangle applications show the identity in varied contexts: logo studies, construction, dock/social contexts, apparel, poster, stamp.
- f617–750 / 12.34–15.00 s: applications multiply into an arc/stack around a central symbol statement, sweep away, and converge into a central branded card before typography takes over.
- f751–876 / 15.02–17.52 s: typographic arrangements open around a single rendered coin. [f830](stills-b/2115445301725335578-1-f830.png) shows a nearly black coin separated by a warm grazing edge; white words sit around, partly behind, and to the sides of it.
- f877–1060 / 17.54–21.20 s: coins follow into a coil/spiral, turn into a ring, and meet circular typography. Macro framing reveals warm metallic edges; the image changes from one object to a rhythmic many-object system.
- f1061–1147 / 21.22–22.94 s: three rotating coins sit in a stable horizontal composition between two copy lines.
- f1148–1253 / 22.96–25.06 s: a short three-part action statement uses a yellow rounded highlight behind its active word; a vertical UI action list scrolls to a selected item.
- f1254–1390 / 25.08–27.80 s: a white phone-like screen grows, its balance/chart changes, and branded postcard compositions follow. The UI is a visual demonstration, not independent proof of financial performance.
- f1391–1495 / 27.82–29.90 s: yellow physical payment cards sit at shallow perspective; foreground type appears and retreats, allowing the cards to fill the frame.
- f1496–1610 / 29.92–32.20 s: a black typographic breather expands/warps then shrinks.
- f1611–1768 / 32.22–35.36 s: yellow returns, the symbol and wordmark settle, and the identity holds with small fine print.

**Art, camera, and finish:** A bold but bounded yellow/black/mint/greige vocabulary connects very different media. The bunny-like mark, arrows, and coins act as recurring assets. Frontal graphic work alternates with shallow physical perspective and macro object framing. Rotating coins are visibly 3D-looking, but specific lens/camera rigs and renderer cannot be identified. Sparse grazing highlights communicate material without making the whole frame glossy.

**Transfer:** Develop a brand grammar broad enough to inhabit typography, masks, physical objects, UI, and real applications. Use transformation when the same idea persists and a cut when the semantic chapter changes. The longest calm holds are identity/proof moments; high motion does not mean constant motion. Reserve a real outro reading interval, rather than cutting at the instant the logo resolves.

## B08 — anugrah: four-up Causal motion studies

[Source](https://x.com/anugrahthegoat/status/2115140975966454087) · [atlas](dense-b/2115140975966454087-1/index.html) · [timestamps](dense-b/2115140975966454087-1/frames.csv)

**Context:** The creator presents selected frames and availability for work. This is a short multi-panel motion reel, not evidence of one complete linear Causal story.

**Observed sequence by quadrant:**

- Top left: f0–15 / 0–0.50 s, colored swatches pop/stagger on white; f18–30 / 0.60–1.00 s, they become a footer in a larger comparison/report UI. That layout holds around f45–85 / 1.50–2.83 s. Around f100–112 / 3.33–3.73 s another white report overlays a landscape plate.
- Top right: a short black-ground comparison heading changes to an evidence heading around f12–20 / 0.40–0.67 s. Around f50–80 / 1.67–2.67 s individual letters reorganize into the brand name. After about f100 / 3.33 s, a request types with inline purple chips and a pale submit icon.
- Bottom left: a black/blue-glow statement types in f0–19, changes around f36–65 / 1.20–2.17 s, and meets a glassy blue/violet flower around f70 / 2.33 s. Lavender takes over the ground around f85–105 / 2.83–3.50 s; the flower then gives way to a colored landscape.
- Bottom right: nodes/orbits accompany an insight-generation caption in f0–29 / 0–0.97 s. Around f30–50 / 1.00–1.67 s a white executive-summary document appears over a gold luminous ground and gains text. A push/reframe crops the document around f80–105 / 2.67–3.50 s; large section headings replace each other after f120 / 4.00 s.

**Art and transfer:** Dark generator scenes, pale output reports, purple functional chips, and luminous organic imagery define different roles within one color family. Abstract metaphor alternates with a recognizable document. A finished film should articulate the relation between input, analysis, and output; an attractive flower alone does not explain causality. Preserve the quadrant-specific purpose when borrowing cues, rather than combining simultaneous excerpts into a fictional single shot.

## B09 — Jay: globe-driven discovery prototype

[Source](https://x.com/jayndeau/status/2115433629182492788) · [atlas](dense-b/2115433629182492788-1/index.html) · [timestamps](dense-b/2115433629182492788-1/frames.csv)

**Context:** The post discusses a discovery experience and recruiting a designer. The artifact is an interactive prototype demonstration, useful for information architecture and spatial interaction rather than a complete brand launch film.

**Observed sequence:**

- f0–54 / 0–0.90 s: a globe with lime continents floats on dark forest green; a white pill invites a spin.
- f55–130 / 0.92–2.17 s: the control fades after pointer interaction. The globe rotates fast, then decelerates. A stable page frame lets the user understand that the globe, rather than the entire camera, is moving.
- f205–240 / 3.42–4.00 s: the globe settles toward Asia; a Shenzhen location marker and side information panel grow/fade into view. f241–430 / 4.02–7.17 s holds the location for reading.
- f431–475 / 7.18–7.92 s: the globe dims behind a new centered action statement. Cards enter from lower left and upper right.
- f476–780 / 7.93–13.00 s: two parallel rows of text/photo cards travel in opposite horizontal directions around stationary central copy. The center remains the attention anchor while the periphery conveys breadth.
- f781–830 / 13.02–13.83 s: cards and copy fade; the globe reappears rotating.
- f950–1100 / 15.83–18.33 s: an Atlantic/US-facing location result and side panel arrive and hold. f1101–1240 / 18.35–20.67 s rotates toward South America and presents São Paulo.
- f1240–1400 / 20.67–23.33 s: another held location precedes quicker location changes. f1410–1580 / 23.50–26.33 s presents Lagos; f1580–1720 / 26.33–28.67 s presents Nairobi; f1720–1853 / 28.67–30.88 s advances through further locations and returns toward Shenzhen. Tiny metadata is not fully transcribed.

**Art, motion, and transfer:** Lime belongs to the geography and selected discovery, rather than arbitrary background flare. A user action motivates animation; slowing rotation leads to a result and reading interval. Spatial orientation functions as information architecture. Use a stable global frame while rotating an object, and distinguish this from a camera orbit in the storyboard. Moving card rows can supply range without moving the central message. Avoid presenting the prototype's repeated exploration as a single linear sales argument.

## B10 — Vadim Carazan: Outset Law identity as a system

[Source](https://x.com/VadimCarazan/status/2115414518910111794) · [atlas](dense-b/2115414518910111794-1/index.html) · [timestamps](dense-b/2115414518910111794-1/frames.csv)

**Context:** The creator frames the work as a logo becoming a larger system. The clip shows a coherent visual identity across a logo, copy layouts, photography, posters, and patterns. It is a particularly useful bridge between editorial design and high motion.

**Observed sequence:**

- f0–69 / 0–1.15 s: a lime block on forest green extends into vertical stripes, then contracts. f70–156 / 1.17–2.60 s, this geometry supports a stacked wordmark, which holds.
- f157–219 / 2.62–3.65 s: a purple ground and peach mark replace the green palette; the wordmark becomes a horizontal lockup.
- f220–288 / 3.67–4.80 s: the striped bar lengthens between the name's two parts and expands vertically toward a rectangular layout field. [f280](stills-b/2115414518910111794-1-f280.png) shows the wide peach module preserving the narrow stripe rhythm at its left edge.
- f289–389 / 4.82–6.48 s: a yellow/gray composition replaces the purple; a short three-line chapter statement appears inside the expanded panel and holds.
- f390–459 / 6.50–7.65 s: portrait photography enters through stripe-like masking and settles. f460–525 / 7.67–8.75 s replaces it with a second portrait using horizontal movement and a shifted stripe edge, now framed in cyan.
- f526–650 / 8.77–10.83 s: the photograph wipes away; the panel contracts back to a lime brand mark on forest green, then into construction lines. This reverses the earlier logo-to-layout expansion.
- f650–810 / 10.83–13.50 s: the composition shrinks into a vertical poster on an off-white ground, followed by a portrait poster. f811–900 / 13.52–15.00 s holds a yellow portrait/copy composition.
- f901–1050 / 15.02–17.50 s: poster image and copy collapse into a closer panel; successive section layouts present color, photography, and usage in different palette states.
- f1051–1165 / 17.52–19.42 s: the panel reorganizes into graphic copy tiles, then holds a green headline. f1166–1250 / 19.43–20.83 s, a line grid takes over and becomes a navy/cyan repeating pattern.
- f1251–1490 / 20.85–24.83 s: the scene contracts into another poster, combines pattern, portrait and copy, and then cycles grid-module variations in green, purple/peach, and cyan/navy.
- f1491–1615 / 24.85–26.92 s: repeating modules coalesce into a square, then a stripe icon, then a horizontal wordmark.
- f1616–1799 / 26.93–29.98 s: the lockup stays stationary while the color field changes through several established pairs and finally rests on forest green.

**Art and camera:** Nearly everything is frontal graphic composition, masks, translation, scale, and changing layout. It gains momentum without a physically simulated camera. The same stripe spacing is recognizable as a logo primitive, text divider, viewport, photo mask, and pattern. Palette changes happen at designed boundaries; they are not arbitrary continuously cycling gradients.

**Transfer:** Specify a brand's geometric relationships before animation: stripe widths/gaps, frame proportions, type alignments, image crop behavior, and palette pairs. Animate the same module into distinct editorial roles. Keep a resolved reading interval after an expansion. Reproduce this relationship between identity and layout using the new brand's own assets and geometry; copying the reference mark is unnecessary.

## B11 — flamefxi: calendar-to-product transition

[Source](https://x.com/flamefxi/status/2114697201473720711) · [atlas](dense-b/2114697201473720711-1/index.html) · [timestamps](dense-b/2114697201473720711-1/frames.csv)

**Context:** The creator explicitly asks viewers to ignore the audio. It has not been reviewed here. The visual reference is a 5.09-second narrative fragment about time spent refining a product.

**Observed sequence:** f0–25 / approximately 0–1.04 s establishes an off-white field, faint construction circles, very large purple blocks clipped at the edges, and a small centered time phrase. f26–32 / 1.08–1.34 s swaps the center for a calendar date highlighted in orange. f33–63 / 1.38–2.63 s keeps the number grid stable while colored circles pop/move among dates, making elapsed time concrete. f64–85 / 2.67–3.55 s cuts wider to many small UI cards around the perimeter; central copy advances through refinement-related words. f86–101 / 3.59–4.21 s clears the cards as the product word becomes the sole center, with a brief purple/black color change. f102–121 / 4.25–5.05 s is a sparse off-white product-word hold.

**Art and motion:** Centered text is the continuous attention anchor while peripheral density expands then clears. Faint construction lines supply texture without becoming the focal subject. The calendar is more specific than a generic particle effect for communicating weeks of work. Intentionally cropped cards imply a larger field beyond the frame.

**Transfer:** Make abstract time tangible with a stable recognizable structure and animated state changes. A collage should culminate in a clear focal object or statement; the final empty field is earned by the preceding density. Treat this as a short transition technique, not a complete sales narrative. Exact per-frame timing should be read from the CSV rather than assuming whole 24 fps.

## B12 — Ayush Soni: Tensorlake web components

[Source](https://x.com/ayushsoni_io/status/2113490687912264068) · [atlas](dense-b/2113490687912264068-1/index.html) · [timestamps](dense-b/2113490687912264068-1/frames.csv)

**Context:** The creator labels this as web-component work for Tensorlake. The movie is a restrained component reel, not an entire product launch narrative.

**Observed sequence:** f0–56 / 0–0.93 s shows a dark olive two-column panel: tall mint/teal line structures at left and a typed serverless-runtime/data statement at right, with a small green button group below. f57–94 / 0.95–1.57 s holds the completed message. A fade/cut around f95–100 / 1.58–1.67 s introduces another section. f101–143 / 1.68–2.38 s reveals an enterprise-oriented heading and three horizontally organized logo/credential tiles. f144–180 / 2.40–3.00 s fades/rises toward a third section. f181–419 / 3.02–6.98 s holds a runtime/data-workflow headline above a central code panel with feature descriptions flanking it; code types progressively early in this interval, then the layout remains readable.

**Art and camera:** The camera stays frontal and stable. Hairline grids and dark olive surfaces organize hierarchy; mint is a quiet functional accent. The visual interest comes from typography, code, columns, and alignment rather than a large camera move or heavy bloom.

**Transfer:** In the editorial direction, let information and reading lead motion. Reveal a headline before the supporting system, and stop animating once the code needs to be understood. If filming code, use real, concise, product-relevant code at a readable size. A beautifully animated webpage component is useful material, but a film still needs a selected argument and progression beyond scrolling through sections.

## B13 — Alex Aperios: three Elio gradient studies

[Source](https://x.com/AlexAperios/status/2112576405343236283) · [variant 1 atlas](dense-b/2112576405343236283-1/index.html) · [variant 2 atlas](dense-b/2112576405343236283-2/index.html) · [variant 3 atlas](dense-b/2112576405343236283-3/index.html)

**Context:** The creator describes gradient-animation testing for a case study. The user specifically likes the background transitions. All **three** attached clips were retrieved and scanned; they are variants, not one 30-second film. Each runs 600 frames / 10 seconds at 60 fps.

**Variant 1, 1080×1920:** f0–110 / 0–1.83 s begins in deep burgundy; orange/gold curved horizon bands rise from below. f111–200 / 1.85–3.33 s stabilizes the two-arch relationship. f201–290 / 3.35–4.83 s fans/spins pale wedge/ray shapes into a radial mark. f291–340 / 4.85–5.67 s completes the brand lockup. Around f350–430 / 5.83–7.17 s a vertical serif line appears between the arches. [f400](stills-b/2112576405343236283-1-f400.png) confirms pale blue typography and mark against warm red/orange fields and a mortgage-process statement arranged vertically. f450–515 / 7.50–8.58 s fades brand/copy; f516–599 / 8.60–9.98 s drops/clears the curves toward the loop's opening state.

**Variant 2, 1080×1440:** f0–100 / 0–1.67 s brings a cold gray/blue upper atmosphere into a warm orange horizon, rising from below. f101–200 / 1.68–3.33 s holds an orange-dominant field. f201–335 / 3.35–5.58 s builds a black radial symbol/wordmark in the lower third. f336–480 / 5.60–8.00 s holds. f481–530 / 8.02–8.83 s removes the lockup; f531–599 / 8.85–9.98 s blends orange through pink/pale tones toward the opening.

**Variant 3, 1080×1440:** f0–70 / 0–1.17 s raises an orange semi-arc against burgundy; f71–120 / 1.18–2.00 s adds a light-blue inner circle. f121–200 / 2.02–3.33 s holds the layered curved horizons. f201–335 / 3.35–5.58 s builds the black radial identity on the blue lower field. f336–480 / 5.60–8.00 s holds the brand; f481–530 / 8.02–8.83 s exits; f531–599 / 8.85–9.98 s clears/falls/fades the blue/orange layers to burgundy for the loop.

**Art, finish, and transfer:** The variants separate two finishes: atmospheric tonal fields and crisper overlapping curved shapes. Warm/cool contrast and occlusion create depth with a frontal camera. Backgrounds have their own slow rhythm while the identity gets a quieter hold. The radial reveal is built from related rays through rotation/scale/stagger, rather than merely fading a whole logo in. The exact source shader/library is unknown. High-bit-depth intermediates, managed color, and tested dithering are implementation proposals for keeping new gradients clean; thumbnail review cannot establish whether these originals contain banding, native grain, or fine noise. Reproduce at delivery size and inspect actual gradient ramps before adopting a finishing recipe.

## B14 — TJ Cages: AutoRouter alpha feature demonstration

[Source](https://x.com/tjcages/status/2110838619078557910) · [atlas](dense-b/2110838619078557910-1/index.html) · [timestamps](dense-b/2110838619078557910-1/frames.csv)

**Context:** The post announces a public alpha and describes model routing. Model names and claims in the film are source content, not this study's verification of availability or capability.

**Observed sequence:**

- f0–79 / 0–1.32 s: an almost empty off-white field carries a tiny gray mark; a small colored streak grows near it.
- f80–115 / 1.33–1.92 s: large soft gray concentric whorls reveal a pale UI plane. An abstract opening is quickly converted into a product object.
- f116–215 / 1.93–3.58 s: a composer/model picker and dark send control become legible; apparent pullback/reframing reveals more of the conversation.
- f216–375 / 3.60–6.25 s: the product frame holds while the pointer approaches the model control. The view is given time to orient the audience.
- f376–410 / 6.27–6.83 s: a white dropdown grows vertically from the anchored picker.
- f411–700 / 6.85–11.67 s: the list scrolls through models and the pointer/hover emphasis changes. [f500](stills-b/2110838619078557910-1-f500.png) confirms crisp text in a rounded white menu with subtle border/shadow, attached to the AutoRouter picker. The bottom anchor remains spatially stable while the long list changes.
- f701–830 / 11.68–13.83 s: the menu returns/closes and the picker remains selected; there is a quiet resulting-state hold.
- f831–891 / 13.85–14.85 s: the UI recedes/fades into off-white.
- f892–1009 / 14.87–16.82 s: a tiny gray branded mark remains with abundant empty space.

**Art and transfer:** Most of the clip's persuasive work is an ordinary picker behaving clearly, not the large abstract entry flourish. Pale UI planes, quiet shadows, and stable controls make the action readable. Stage the approach, action, expanded state, selection, resulting state, and exit as distinct beats. A proof scene should not keep orbiting or blurring while the viewer reads. Source-specific model names should never become hard-coded defaults in the skill.

## B15 — Ayush Soni: graph-assembly experiment

[Source](https://x.com/ayushsoni_io/status/2110034769685962919) · [atlas](dense-b/2110034769685962919-1/index.html) · [timestamps](dense-b/2110034769685962919-1/frames.csv)

**Context:** The creator describes experimenting with Claude for motion and gives their own mixed assessment, including excess expression. That subjective caption is useful context, not an objective quality score or a reason to treat all motion in the clip as a standard.

**Observed sequence:** A square black canvas has a subtle grid, with a split clarity/data headline at upper left and lower right. f0–20 / 0–0.33 s introduces an orange square near left-center. f21–50 / 0.35–0.83 s incrementally draws hairline boxes/connectors and reveals dark card content. f51–73 / 0.85–1.22 s introduces a magenta active card at upper right. f74–100 / 1.23–1.67 s adds a yellow lower card and its relationships. f101–629 / 1.68–10.48 s is predominantly a held completed graph, with minor residual changes rather than new narrative scenes.

**Art and transfer:** Three bright accents identify important functional nodes against quiet wireframe context. The two headline blocks bracket the diagram. The build follows a useful semantic order: anchor → relationships → highlighted outputs. The long rest is materially longer than the assembly; do not mistake this for continuous high-motion editing. Borrow staged graph construction and hierarchy, then review easing and holds against the actual communication task. An AI-generated experiment is a technique reference, not a blanket validation of a production method.

## B16 — Peer Richelsen's quoted Linear film: product performs the plot

[User-supplied parent post](https://x.com/peer_rich/status/2107856619979579679) · [actual quoted film source: Karri Saarinen](https://x.com/karrisaarinen/status/2107676903553585155) · [atlas](dense-b/2107856619979579679-1/index.html) · [timestamps](dense-b/2107856619979579679-1/frames.csv)

**Context:** The parent post adds commentary to a quoted Linear announcement. Public metadata contains the video inside `quoted_tweet`; there is no native parent attachment. The film introduces a review/diff workflow inside Linear. The creator's release claims are not independently tested here.

**Observed sequence:**

- f0–80 / 0–2.67 s: a macro, oblique view of the dark Linear sidebar focuses on the review destination; a pointer selects it as framing shifts subtly.
- f81–205 / 2.70–6.83 s: the review-request list is revealed to the right. It remains at a controlled oblique angle with one row emphasized; the camera-like path follows the product hierarchy.
- f206–365 / 6.87–12.17 s: a diff pane enters the composition from the right. Red/green syntax hunks, file context, and sidebar coexist in a layered, angled framing.
- f366–435 / 12.20–14.50 s: the view approaches the review header and a guide tab. This is a change of task, not a random cut to another dashboard.
- f436–675 / 14.53–22.50 s: a more frontal split layout puts explanatory material beside code evidence. Code hunks scroll while the explanatory section advances. There is less perspective distortion during the content-heavy proof.
- f676–739 / 22.53–24.63 s: the guide/proof layout continues with a stable reading interval.
- f740–915 / 24.67–30.50 s: a macro review-submission control/counter is followed by an anchored code-comment area. Attention moves from understanding the change to acting on it.
- f916–1225 / 30.53–40.83 s: the comment/composer workflow occupies an extended macro interval, including a text-bearing state and a response/result state. [f1100](stills-b/2107856619979579679-1-f1100.png) shows the reply composer empty below a posted rename-request comment; the code is to its left and nonfocal text above is softly defocused. The thumbnail pass alone is insufficient to transcribe every line or certify every click.
- f1226–1325 / 40.87–44.17 s: code/review actions return at macro scale, with approval/submission controls visible.
- f1326–1390 / 44.20–46.33 s: the UI darkens/fades out.
- f1391–1440 / 46.37–48.00 s: a centered diff-oriented closing phrase appears on black.
- f1441–1557 / 48.03–51.90 s: the Linear lockup settles and holds.

**Art, camera, and finish:** Charcoal UI recedes around syntax-colored evidence and purple actions. Shallow angle, cropping, selective softness, and shifting scale create a cinematic macro feeling, while content-heavy phases return toward a frontal split composition. These are apparent camera behaviors; the exact lens, focus model, scene construction, and renderer are unproven. The selected native-size still demonstrates that some peripheral text is deliberately soft; it is not a rule to blur important proof.

**Transfer:** Build a coherent screen-space route: destination → list → selected change → guide → code evidence → comment → review action → close. Reuse the same case and data so each shot inherits context. Let actual product behavior serve as the plot; little added copy is needed when the task is concrete. Use oblique beauty framing for orientation and transitions, then protect legibility during evidence. Leave enough time for the result and final identity to register.

## Categorized learnings for the skill

These are analyst interpretations derived from the observed references, not universal laws or claims about how the originals were built. Use them as selectable design mechanisms with a purpose, then validate in the new film.

| Category | Mechanism to encode | Source and concrete evidence | Decision/check for a new film |
|---|---|---|---|
| Narrative | Show disorder becoming organized work | B03 f77–235, then receipt and integration f425–599 | Does each later scene answer the opening problem with an observable operation? |
| Narrative | Explain an agent through goal, tools, cost, authority, input, action | B05 f220–690 | Can a viewer say what the agent may do, what it costs, and what it actually did? |
| Proof | Product behavior can be the principal plot | B16 f81–1325; B14 f376–830 | Keep the same case/data and demonstrate a completed interaction rather than a sequence of unrelated hero screens. |
| Reference classification | Separate full films, unused shots, UI prototypes, loops, component reels, and four-up boards | B02/B04/B08 multi-panel; B06 process; B09 prototype; B12 components; B13 variants | Borrow only the property for which the reference is evidence. Do not infer a linear story from parallel panels. |
| Brand/art direction | Derive motion vocabulary from a distinctive primitive | B01 f8–104; B10 f220–650 and f1491–1615 | Specify a new brand's primitive, spacing, shape, type, mask, and allowed transformations before animating. |
| Brand/art direction | Use a family of applications to prove the identity can live in the world | B07 f531–750; B10 f650–1490 | Applications should extend one grammar, not merely introduce unrelated styles. |
| Editorial direction | Stable camera, typography, real code, columns, deliberate holds | B12 f181–419; B10 poster intervals | Prefer information hierarchy and a justified crop over decorating every frame with movement. |
| High motion direction | Alternate high-energy transitions with fully resolved silhouettes and reading holds | B01 f26–43/f94–104; B07 f329–390/f1611–1768 | Mark settle and read intervals in the storyboard. A scene is not finished at peak overshoot. |
| Attention | Keep one clear anchor while contextual material changes | B11 center copy; B09 f476–780; B06 central pill band | Can the viewer reliably locate the intended subject before, during, and after the transition? |
| Motion | Couple size, width, and position to importance | B06 f40–260 | Active/inactive states need distinct behavior; moving everything equally weakens hierarchy. |
| Motion | Reveal relationships in semantic order | B02 top-right graph; B15 f0–100 | Build source → connection → operation → output so motion teaches the system. |
| Transition | Reuse a module as a mask/viewport/layout boundary | B10 f220–525 | Define what persists and what changes. Use a cut when no meaningful continuity exists. |
| Transition | Let background layers own a slower rhythm than the foreground | B13 all variants, especially f201–480 | Background motion should preserve brand readability and a controlled hue/value relationship. |
| Cinematography | Distinguish object rotation, scene translation, global scale, and actual camera orbit | B09 globe; B04 coins; B10 frontal graphic work | Name the visible behavior accurately before choosing a technical rig. Many effects need no 3D camera. |
| Cinematography | Change conceptual scale with a motivated push, pan, or pullback | B05 organization→worker→event; B16 task hierarchy | Write the new information revealed by the move. If none, test a stable shot instead. |
| UI cinematography | Oblique setup may lead to frontal proof | B16 f0–435 versus f436–739; B14 f216–830 | Perspective, blur, and shadow must not obstruct the action the viewer needs to understand. |
| Palette | Assign accents semantic jobs | B05 mint/violet/pink/yellow; B04 green confirmations; B03 lime process | Define background, ink, action, state, and completion colors instead of selecting colors per shot. |
| Palette | Contrast controlled pairs at scene boundaries | B10 forest/lime, purple/peach, cyan/navy; B07 yellow/black/mint | A vibrant film still needs predictable combinations and minimum readable contrast. |
| Typography | Impact scale must resolve into a readable phrase | B03 f732–794; B07 f0–84 | Do not ask viewers to read while text is outside the frame or crossing at peak velocity. |
| UI | Stage approach, action, expansion, selection, result, exit | B14 f216–891 | Use truthful cursor paths and preserve control anchors; provide the resulting-state hold. |
| Material/lighting | Use grazing highlights and edge thickness to separate dark objects | B04 coin board; B07 f801–1060 | Decide geometry, roughness, key/rim light, and dark-value separation as a system. |
| Finish | Choose between clean graphic, pale UI plane, dark material, atmospheric gradient, and mixed identity finishes | B10; B14; B04; B13; B07 | Finishing is a scene-design choice. Do not apply bloom/grain/DOF to every layer by default. |
| Review | Thumbnail coverage is useful for sequence/continuity; native frames and playback remain necessary for final quality | This study's actual scope | Review real delivery resolution for text/edges/gradient quality; watch at speed and listen separately before approval. |

## Implementation hypotheses, separated from observations

The source files do **not** reveal whether GSAP, CSS, Figma, a DCC, a browser renderer, or a wgpu renderer made the original shots. The following are routes for new work, not reverse-engineered source facts:

- Frontal type, stripe masks, node graphs, pill carousels, UI crops, and global pan/scale can be expressed as deterministic scene properties in DOM/SVG/canvas or a 2D GPU renderer. B10 shows why building a real 3D camera for every transition would add complexity without a visible requirement.
- True coin edge thickness, changing metallic highlights, occlusion, and complex curved surfaces justify a real geometry/light/material pipeline, or pre-rendered assets with consistent lighting. The decision follows visible material behavior, not the word “cinematic.”
- A virtual camera specification should separate position, look target, focal length/orthographic scale, object transforms, and focus plane. The storyboard should state the attention target and information revealed, before selecting a rig.
- For a wgpu implementation, express the same scene/timing semantics independently of the backend, then choose GPU compositing for transforms, masks, gradients, vector/text assets, selective blur/bloom, and cached static layers. These references alone provide no benchmark evidence for a fastest renderer, and do not establish browser-to-native feature parity.
- Gradient cleanliness, text rasterization, color management, alpha premultiplication, motion blur sampling, temporal stability, and final encoding must be checked at delivery resolution. Faster preview is not evidence of matching final finish.
- Audio direction remains an explicit research gap in this batch. No frame scan can establish where a sound lands, whether narration makes a claim understandable, or whether the mix leaves room for it. Add listening and audio-event timing before converting these references into sound rules.
