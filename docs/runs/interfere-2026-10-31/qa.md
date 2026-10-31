# Independent QA — Interfere
Reviewer: actual independent agent /root/independent_qa. Start22:18UTC,31October2026IST. Status: changes requested; correction verification in progress.

Inspected source files, actual running page, full rendered desktop1440×7286 and mobile390×9089 screenshots, actual source desktop full capture, mobile top and geometry. Captures: qa-desktop-full.png,qa-mobile-full.png. The full-page captures were actually opened and visually inspected. Parent-supplied REA evidence was reviewed as source provenance, not asserted as this reviewer’s own tool execution.

## Findings and correction status
1. P1: `?view=interfere-page` fell through to the system catalog. Parent corrected dispatch. Reviewer reloaded and verified actual page renders, mobile iframe9090px (1px rounding vs static9089). Resolved.
2. P2: mobile release carousel source markup kept both navigation buttons disabled inside overflow-hidden; remaining cards inaccessible. Parent added native horizontal overflow and interactions.js. Verification pending because current runtime source.css became0bytes during synchronization at22:21UTC. Project source.css remains348135bytes. Parent notified to restore/verify runtime files.
3. P2: standalone header iframe measured64px and clipped absolute native disclosure panels. Parent added open-panel extent measurement on native toggle. Verification pending after runtime restoration; current unstyled header expands to281px, which does not validate intended panel geometry.

## Passed observations
Desktop source geometry matches hero promise x40/y208 at1280×720,56/56 type, split supporting copy and native-scale cropped product window. At1440px, full page total7286px. Mobile390px has24px edges, heading y112/h72, total9089px and document scrollWidth390. Eleven section sequence and all feature scenes, security, release list, footer present. Text does not shrink with the wide product proof. Dark surfaces, soft white type, fine rules, source serif testimonial and layout rhythm preserved.

Native mobile navigation opens with Enter and exposes all source destination links. Links were checked in DOM and point to the original product and original external destinations. Two local raster images loaded. System detail resolves Interfere with no broken image, complete guidance and correct section inventory. No unsupported live backend claim appears in InterfereNotes.

## Limits
Hero collaborator source photographs become initials in retained SSR scene; this is a specific static-state substitution. Testimonial and trust strip are settled snapshots; source capture contains partial reveal/scroll state. No claim of all-frame pixel identity or recovered application behavior. Public rendering, keyboard disclosure and links were tested; source login/service backends were not exercised. Current project hashes are in qa-revision.json; pending corrections require final hashes and affected behavior recheck.
