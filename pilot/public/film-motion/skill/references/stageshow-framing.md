# Stageshow-informed product framing

Use this pass before detailed UI construction and motion, for both editorial and high-motion films. Source: Benji Taylor's [Stageshow skill](https://github.com/benjitaylor/skills/blob/299140fafd08df55a9c234e610c3f64af3f45531/stageshow/SKILL.md), version 1.1.1, checked 6 November 2026. Source files and hashes are recorded in [stageshow-source.json](stageshow-source.json). This guide adapts its miniature-product composition approach to our film workflow.

## Source principles to apply

Stageshow plans the focal object, action and payoff before implementation. Its [framing guide](https://github.com/benjitaylor/skills/blob/299140fafd08df55a9c234e610c3f64af3f45531/stageshow/references/framing.md) preserves recognizable context, keeps important words/controls and opened overlays in view, distinguishes supporting surfaces, and treats a compact layout as a new composition. Begin with a frontal view; compare perspective against it at the actual display size. Deliberate crops remove incidental material while keeping the story intact.

Its [craft guide](https://github.com/benjitaylor/skills/blob/299140fafd08df55a9c234e610c3f64af3f45531/stageshow/references/craft.md) separates meaningful content from background detail, keeps domain-specific identity and fits typography/spacing before polishing. A simplified view still needs enough structure to explain the task. For this skill, factual UI/proof comes from verified product states; conceptual illustrations are identified in review material. A believable reconstruction is not evidence of an unsupported capability.

Its [motion guide](https://github.com/benjitaylor/skills/blob/299140fafd08df55a9c234e610c3f64af3f45531/stageshow/references/motion.md) connects input to consequence and selects a settled poster that communicates the result. Its [rehearsal guide](https://github.com/benjitaylor/skills/blob/299140fafd08df55a9c234e610c3f64af3f45531/stageshow/references/rehearse.md) checks actual stills, busy states, changing overlays and the whole animation at intended widths; a clean report does not settle composition quality.

## Our required framing pass

The following artifacts and ownership are our film-specific implementation of those principles:

1. **State the shot's visual job.** Director/story define the takeaway and required proof. Art/UI name the focal object, recognizable context and exact native/campaign words. Choose supporting surfaces only when they add distinct information.
2. **Choose the final visible crop.** Art/camera compose at the delivery aspect and smallest intended viewing size. Plan the stage, crop, background, hierarchy and text scale together. Keep window/device proportions faithful. A closer view can outperform shrinking an entire dashboard.
3. **Reserve the interaction envelope.** UI/motion map trigger, cursor/touch target, largest open menu/panel, feedback and changed result. Camera checks that this envelope survives its path. An attached popover follows its real product anchor; an editorial callout has a separate job and cannot obscure proof.
4. **Compare concrete layouts.** For uncertain framing, show alternatives such as context with detail, control close-up, connected views, or one event across devices. Inspect full stage beside final crop, including the open-overlay/busiest state. Framing decisions become reviewable before expensive motion.
5. **Select the settled result.** Editor/UI choose an exact poster/proof frame after meaningful labels and geometry settle. It must explain the result as a still, with enough context to identify the action. The actual cut separately establishes the action and readable hold.
6. **Recompose each variant.** Adapt crop, object placement, supporting surfaces and copy for portrait/square/small displays. Regenerate sheets at the actual variant sizes. Review the whole shot again after layout or camera changes.

Record this in the shot's `composition` object in [production-contract.md](production-contract.md). Art director owns intent/hierarchy; UI designer owns truthful states and protected content; cinematographer owns crop/path; motion designer owns state transitions; independent reviewer names observed composition defects. The director integrates one accepted layout revision.

## Contact-sheet requirements

Include these images within the existing stage sheets in [contact-sheets.md](contact-sheets.md):

- Context and final crop, with the focal object identifiable.
- Trigger/action, largest overlay-open state, changed result and settled poster.
- Departure/midpoint/arrival if the camera changes the crop.
- Each requested aspect variant and the smallest intended display check.

Use review annotations or a separate overlay to show protected regions without altering authentic UI. Check accidental cut controls/words, obscured results, unsupported empty areas, weak foreground/support hierarchy, distorted devices and a cursor masking its target. Deliberate off-frame transitions have explicit shot intervals; required product evidence is clear during its intended reading interval. Missing required framing images leave that visual pass pending. Re-render and inspect affected sheets after correction.

## Using the upstream kit

The user-supplied installation route is `npx skills add benjitaylor/skills --skill stageshow`. This film skill incorporates its framing guidance without requiring its React/CSS kit in every renderer. If choosing the actual kit, read its installed instructions, start from an appropriate upstream example, adapt to the real product, preserve source notices, and run its rehearsal tools against the real scene. Record actual reports and unresolved/manual review; do not claim an upstream gate ran on our separate browser starter.

Stageshow's authored cursor actions illustrate interaction. Product capability and performance claims still require their own evidence. Its web-loop lengths, crop percentages, fixed gutters and viewport examples do not set film duration or composition universally. Runtime selection, absolute-frame seeking, playback/audio and final encoded-file review remain the film's own contracts. A frame-addressable adapter for upstream animation must be demonstrated before using it for deterministic export; none is bundled by this update.
