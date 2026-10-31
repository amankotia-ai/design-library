# Integrated dropdown focus edge
Start2026-10-30 21:22:56 UTC /31 October02:52:56 IST.
Deadline2026-10-30 21:42:56 UTC /31 October03:12:56 IST. Maximum20minutes; scoped CSS correction.
Scope: user dislikes detached dropdown active/focus ring. Existing global select:focus-visible uses2px outline with4px offset. Override only shared library dropdown focus to use dark border plus1px same-color shadow, no outline. Creates continuous2px edge and keeps visible keyboard focus. Preserve transparency, pill shape, native behavior and all other controls.
Completion: actual focused dropdown single edge/no gap; keyboard Tab focus visible; transparent states; filter still works; independent QA.
Source: supplied active dropdown screenshot + actual style.css rule.
Freebyrd index/thread/references returned no folder context.
Real specialist /root/visual_analysis performed visual analysis of actual screenshot (confirmed double separated capsules), product design (native/keyboard focus and override specificity) and art direction (continuous dark2px edge). Parent actual render confirms outline:none,dark border+1px shadow,transparent fill and focus-visible true. Screenshot captured with surrounding8px to prove gap/ring removed. Independent QA delegated separately.
Final: build passed. Independent /root/independent_qa inspected actual focused screenshots and reachedselect using real Tab sequence, confirming continuous edge,outline:none,transparent hover and filtering/reset. style.css hash347d958acaf0891e899ccc7219fb465fcbf3af0324f748c4fe0da01be0949108 matches runtime/canonical. No blocking findings or required unfinished items.
