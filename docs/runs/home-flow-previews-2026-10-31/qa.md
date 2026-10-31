# Independent flowing-preview QA

Reviewer: `/root/cleanup_qa`. Verdict: **passed**. No blocking findings.

Read the task brief, analysis, art direction, browser-check evidence, and final source. Visually inspected the actual 1440px, 768px, and 390px output screenshots and compared them with the preceding bounded-preview run. Independently exercised the current live page in Chromium; results are in `qa.json`.

All three previews show materially more initial page content: Quiet Serif reveals the following image-grid and landscape sections; Cobalt Grid reveals the workshop and principles; Blueprint reveals its editor and gallery. Top/side neutral inset remains, while the page continues flush through the hard lower crop. The remaining measured 1px at the stage bottom is its separator rule, not a bottom neutral gutter. The preview content does not paint over the card metadata. No browser chrome, new decorative text, gradient, or fade was added. Desktop cards stay aligned; tablet and mobile fit without horizontal overflow.

Source now calculates the logical iframe height from actual viewport height and scale and observes resize changes. The old fixed900px style is removed; final desktop logical height is1907px. Observer cleanup and lazy loading remain.

Independent live checks confirm all three frames scroll from0 to700px with the outer page stationary; Tab from the final Quiet Serif frame link exits to the card title; iframe focus gives the solid surrounding outline; all three title links reach the expected system details. At390px, scrolling on the neutral surround moves the outer page400px without overflow. No browser page errors occurred. Existing title/Explore links and prior page cleanup remain.

Limitations: physical touch gestures and exhaustive inner-page controls were not tested. The mobile screenshot captures Blueprint's existing dynamic canvas in a black startup frame; desktop/tablet show the pattern, and the assembled page content around it is loaded. This review does not promise deterministic source-animation frames. Build/input checks were reported passed by the implementation owner rather than repeated by QA.

Inspected final source SHA256:

- `pilot/src/system-browser.jsx`: `a02daea463987f8bc787b80bb872929c3597bccbdc27df842e7ddb364c4c5816`
- `pilot/src/system-browser.css`: `a50e5f98411cbd4426ef4b7ff47b2ce0d7291d6d02bded5c45a4b22d21fabe08`

This verdict applies to these revisions and the requested taller, lower-cropped preview treatment. No implementation files were changed by QA.

## Concurrent detail-page change: scoped confirmation

After the review, concurrent work removed only the `signal-specimen` conditional class in `SystemPanel` and the matching detail-page specimen CSS/comment. At the followup inspection, runtime and workspace already matched each other, so their direct diff was empty. Compared the retained `reviewed-system-browser.jsx/css` snapshots with the current workspace. Independently reversing precisely those detail-only deletions in memory reproduces the original reviewed source SHA256 values listed above. This confirms there are no other file differences: homepage component code and homepage CSS are unchanged. The removed selector was scoped to `.system-detail`, which does not match homepage preview cards. No homepage recapture is required; the existing homepage verdict remains **passed**. The unrelated system-detail typography change is outside this review.

Current workspace/runtime SHA256 at this scoped confirmation:

- `pilot/src/system-browser.jsx`: `73126eed095ba4c697891b0c176729298de44f477f97433a1722ce427cbae18f`
- `pilot/src/system-browser.css`: `41cbcec3df29644cd479702c87c703c232a5a6a7502627edf50677c6d749c6c4`

The original rendered/runtime review hashes remain recorded above; these newer full-file hashes include the unrelated detail-page deletion. QA did not edit or synchronize implementation files.
