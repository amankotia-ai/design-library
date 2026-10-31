# Specialist production workflow

## Roles and concrete handoffs

| Role | Responsibility | Evidence produced |
| --- | --- | --- |
| Orchestrator | Resolve brief, mode, reference selection, dependencies, ownership, and corrections | Task brief and record of actual agents and handoffs |
| Visual analyst | Inspect original images/video; measure composition, scale, spacing, typography, color, crops, and effects | Annotated images and measurements with observed/inferred labels |
| Product designer | Define semantics, component boundaries, realistic content, responsive rules, states, and accessibility | Product constraints and review against the working implementation |
| Art director | Explain the design language, protect reference character, and define coherent extension rules | Visual direction, system rules, and comparison-based review |
| Implementation owner | Translate approved constraints into shared tokens, reusable sections, responsive shells, and previews | Source files, runnable preview, captures, and relevant checks |
| Independent QA | Inspect outputs against the original, brief, and behavioral requirements | Findings and final review tied to the exact output revision |

The parent can be the implementation owner. Final QA must be a different agent from the creators of the output it reviews. Other specialists can also flag issues; their reviews do not replace independent QA.

## Execution

1. Establish task intent, original media, target dimensions, protected details, mode, output requirements, and known unknowns.
2. Visual analysis and product analysis may run concurrently. Art direction consumes their actual evidence and defines the system and section contracts.
3. Build one representative section and inspect it before extending to a family. Share the original and live/rendered output with reviewers.
4. For faithful reproduction, compare at the source dimensions using aligned screenshots, overlays where useful, and critical detail crops. Measure geometry and preserve available exact assets. Record substitutions and uncertainty.
5. For system expansion, compare with the declared system rules and product needs. Review responsive variants as adaptations, rather than treating an unobserved mobile layout as recovered source behavior.
6. Route each finding to an owner with its location, evidence, requested correction, and success condition. Re-render and recheck affected outputs.
7. Independent QA inspects the current source, output images, and working behavior. Review relevant viewport sizes, long/short content, keyboard behavior, controls, and required states. Choose checks appropriate to the actual change.
8. Deliver components, system inputs, portable assets, visual previews, and review evidence together. Report unresolved limitations directly.

Respect the live agent limit. Use dependent waves and distinct writable files or directories. Do not create separate user-owned chats for these internal specialists.

## Evidence and status

For each production run, record:

- Run ID, mode, source IDs/media paths, implementation revision, and target viewports.
- Actual agent identity and role, assigned files, and handoff artifacts.
- Observations, inferences, missing assets, and any proposed substitutions.
- Output paths and hashes or another unambiguous revision identifier.
- Findings, owners, resolutions, reviewer identity, and the revision inspected.
- Review status: pending, changes requested, or passed.

A schema or automated check cannot prove visual inspection. A passed screenshot review does not establish product usability. Keep those claims proportional to the evidence. If independent agents or required previews are unavailable, continue useful preparation and report the missing review explicitly.
