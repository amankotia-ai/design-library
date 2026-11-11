# Assets and compositing

Treat asset acquisition as part of directing each shot, before animation. Reuse the established brief and direction. Select assets for their narrative role and usable motion envelope, then verify their actual quality and provenance.

## Choose how each element is made

| Route | Use when | Shot decision |
|---|---|---|
| Capture | Actual product behavior or original people/work footage provides evidence. | Required state/action, framing, continuity, and usable take. |
| Source | Stock footage, photography, sound, or existing brand assets supply suitable material. | Exact selected asset, permitted use, in/out range, and replacement status. |
| Generate | A designed still, environment, mockup shell, texture, illustration, or cutout serves the story. | Reference set, composition, required invariants, and selected version. |
| Build | UI, typography, diagrams, geometric objects, or responsive layout must remain precise. | Editable components and deterministic state/timing. |
| Pre-render | A demanding spatial/material shot benefits from an offline renderer. | Camera, passes, frame range, color handoff, and composite destination. |

A shot may combine all five. Name the narrative role of each asset: context, proof, atmosphere, transition, or result. Avoid acquiring an attractive asset without knowing where it belongs.

## Source stock for the edit

Write a stock brief containing the action and emotional beat; subject and setting; shot size, angle, gaze and screen direction; camera/subject movement; usable duration and extra head/tail handles; delivery crops and negative space; lighting direction, contrast and color; and intended grade. Specify whether a screen must be replaceable or an overlay tracked. These requirements are more useful than a broad keyword such as “productive office.”

Compare a small shortlist against the neighboring shots. Use existing licensed media or provider-permitted previews for the animatic, retaining watermarks and preview restrictions. Record provider/item IDs, source URL, selected range, license option and availability. Use established licensing access and purchase authorization. If a selected asset requires spending outside that authorization, prepare the exact asset, price and intended use before asking; do not purchase speculatively during research.

Create an asset-family contact sheet and in-context style-frame sheet before detailed animation; the asset-designer and art-director agents inspect the same selected versions. Use [contact-sheets.md](contact-sheets.md) for labels/manifests. Do not approve consistency from isolated files or textual descriptions alone.

Relink the selected preview to that asset's licensed original, not a lookalike. Verify take/version, duration, frame cadence, presentation timestamps, crop, scale and in/out alignment; previews may have different encodings or offsets. Recheck the edit after replacement. Keep preview media out of final delivery unless its terms explicitly allow that use.

## Generate plates; preserve product truth

Inspect the available generation tool's current capabilities, reference/edit support, dimensions, and transparency options before specifying outputs. Test a representative asset before commissioning the set. The prompt is an intention; judge the resulting pixels, especially exact marks, text, geometry, and consistency between images.

Use generated imagery for backgrounds, concept stills, abstract materials, atmospheric plates, blank device/mockup shells and isolated objects. It is not evidence of shipped behavior. Keep authentic UI, exact copy, logos and critical data as separate captured or built layers. A generated device or environment must not distort the product being demonstrated. Label conceptual imagery where it could be mistaken for a real capability or testimonial.

Prepare a compact style-reference pack: chosen brand assets, palette/type rules, one selected styleframe, relevant material/light references and composition sketches. Assign each input a role. Build a consistent asset set from selected masters; compare the set together for recurring geometry, perspective, light, texture and color before animating.

**Prompt recipe:** intended shot and asset role; subject; composition/crop; lighting/material; palette; reserved UI/text space; motion envelope; required output; unchanged properties. Example: “Cream architectural background for a SaaS result reveal; empty center-right for the separately composited app; soft left daylight; subdued green accents; extra canvas for a gentle push; no text. Preserve the reference's horizon, shadow direction and material scale.”

For revisions, change one condition and name the invariants. Compare the returned asset against them. Composite pixel-identical regions from the original rather than relying on a generative edit to preserve them exactly.

Choose the available generation provider/model by required fidelity, editing support, dimensions, transparency, cost and access. Use the available image-generation tool first; add a provider adapter only if repeated automation needs it. Keep model choice out of the creative rules. Save selected outputs before animation. Generation happens upstream of the deterministic frame renderer, not as a fresh generated image for every video frame.

## Compose for the intended movement

Plan negative space, delivery crops, safe edges and overscan from the actual camera envelope. Test the most demanding zoom/crop before polishing. Request separate layers or alpha only when independent motion, occlusion or replacement needs them; otherwise a finished plate is simpler. Inspect cutout edges and shadows on the destination background, and verify real alpha rather than a painted checkerboard.

Layered stills can support controlled pan, push, crop and modest parallax. They do not supply unseen surfaces, reliable large rotations, changing reflections or physically correct relighting. Use suitable 3D geometry, pre-rendered footage, or a different shot when movement exposes those limitations. Match perspective, contact shadows, grain, focus and color across elements; keep the UI readable through the final composite.

## Keep an asset manifest

For each selected version record:

- Stable asset ID, role, local path/checksum, source/capture/generation provenance and used shot IDs.
- Provider/item ID or generation provider/model/settings, prompts, reference versions, edit lineage and selected output.
- License/permission record, attribution/release requirements where applicable, and preview versus cleared-original status.
- Dimensions, duration, timebase/PTS and frame cadence for media, selected in/out plus handles, audio availability, alpha mode, color profile/transfer and processing history.
- Crop, tracking/mask dependencies and unresolved limitations. Keep unknown metadata explicit.

## Three-shot SaaS example

1. **Context, 3s:** licensed stock of a person reviewing requests; leave space for separately built notification graphics. Choose a calm camera and sufficient edit handles.
2. **Proof, 7s:** authentic capture or faithful UI reconstruction groups the requests. Isolate the action, then hold the changed result. All copy remains editable.
3. **Outcome, 4s:** composite that same result over a selected generated architectural plate; use a restrained push and built headline. Use pre-rendered 3D only if the planned camera requires it.

Illustrative timings and capability only; adapt to verified product behavior.

## Three staged intake questions

1. **Discovery:** Which product states and existing footage/assets can supply the proof?
2. **Treatment:** Where would stock context or generated imagery help, and what acquisition budget or restrictions already apply?
3. **Animatic:** Which selects/styleframe best support this sequence, and does the intended motion require layers, overscan or actual 3D?

Reuse prior answers and ask only unresolved questions when they affect the next decision.
