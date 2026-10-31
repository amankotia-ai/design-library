# Independent QA — Emil-inspired library shell

Reviewer: `/root/emil_qa_final`, independent from implementation. Status: **passed**.

Directly inspected the actual Emil reference crop, full delivered desktop capture, and full delivered mobile capture. The output preserves the narrow reading column, restrained hierarchy, near-white surface, plain masthead, and rounded inset examples. The existing editorial components remain distinct inside the previews.

Ran 36 browser checks against `http://127.0.0.1:5175/`: Study/Sources/System at 320,390,768,1440px without document overflow; one h1 per panel; section select; desktop source-sized hero and mobile390 preview; side-by-side source images; overlay75% source opacity; dismissible notice; attributed source resources; keyboard focus; no browser errors. The former preview-height issue is resolved: switching page→Footer shrinks the iframe to natural body height.

No application changes were made by QA. The screenshot and source SHA-256 identities inspected are recorded in `qa-final.json`. A first image-load assertion ran before image readiness; it was corrected to wait for loaded images and the complete check was rerun. This was a test timing issue, not an application finding.

Limits: source custom Sans font is unavailable and the shell uses local Inter. This review establishes the inspected adaptation's behavior and visual coherence, not exact recovery of the reference site or unseen mobile design.
