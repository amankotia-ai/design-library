# Equal navbar padding follow-up
Start: 2026-10-31 03:04 IST. Deadline: 03:24 IST.
Scope: use one shared navbar inset for top and sides,32px desktop/24px mobile, across catalog and detail routes. Preserve full width and existing content widths.
Mode: original layout adjustment. Current catalog CSS already uses matching32/24 insets; detail base uses63/44px top and103px min-height, so normalize the shared rule and remove redundant route overrides.
Completion: matching computed padding and brand-edge offsets, desktop/mobile captures, build, independent QA. Freebyrd index has no folder context; prior thread/references also returned none. Existing Baseline UI/Sites guidance applies.

Delivered: shared --library-header-inset token32px desktop/24px mobile; padding-top and inline consume it on all library routes. Removed redundant home padding overrides and base103px minimum height. Source/runtime synced; build passed and current compiled files copied to pilot/dist. Parent computed Pages top/left/right:24/24/24 at390px and32/32/32 at1440px; actual screenshots inspected. Independent checks cover catalog/detail and representative widths; see equal-padding-qa.md. Existing brand asset vertical centering can place visible ink1-2px inside the padding edge; this is preserved.
