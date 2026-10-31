# Blueprint faithful reconstruction — product contracts

Role: `/root/full_product` · 30 October 2026. Mode: faithful source reconstruction of the complete public landing page; earlier Signal Workshop expansion remains separately addressable.

Inspected the actual captured desktop reference with the image tool and the preserved per-section DOM. The first full-page capture leaves most scroll-reveal content transparent, so it is not evidence of absent source sections. Parent was notified to scroll-reveal all sections before final capture. The original whole-document DOM string is truncated at 200,011 characters; per-section `sections.json` preserves complete pricing, FAQ, closing prompt and footer fragments.

## Required page family

Navigation, hero, live editor/demo and examples, prompt comparison, features, pricing, sixteen-question FAQ, closing prompt, and footer must all be separate reusable source-study components and appear in the complete page. Source wording, source assets, Geist typography, CSS breakpoints and measured spacing take priority over original copy or creative adaptation. Source study and original expansion must be visible modes in the library.

## Commerce and closing contracts

- Pricing keeps the exact `l-section`, `l-wrap`, `s-head`, `pricing-toggle`, `plans`, `plan`, `plan-free`, `pricing-meta` and `pricing-compare` structure/classes. Monthly and Yearly are native buttons with `aria-pressed`; changes preserve keyboard focus. Default is the observed Yearly state. Current public source prices/copy are study content captured on this date, not a live billing service.
- Source monthly launch prices and visible state must be observed rather than inferred from a percentage alone. Annual allowance wording disappears where the monthly source state does so. Checkout links go to the source service; the local study never fakes a purchase, subscription or account.
- Compare all plans remains a real disclosure. `aria-expanded`, `data-open` and `inert` must agree; the visible table retains source rows and source headers. Its closed descendants must not enter keyboard navigation.
- The FAQ retains all sixteen native `details` / `summary` rows and exact answer text. Multiple rows may stay open as the source native markup permits; no invented one-open-only behavior. The iframe host must continue observing height changes.
- The closing prompt has a real labeled textarea, maxlength 500, visible send control and source-compatible GET destination. A submission takes the entered prompt to Blueprint's public new-tool flow; the local study does not claim generation. The source animated suggestion is an example, not a submitted request until the visitor chooses to submit.
- Footer preserves exact source mark, status label, navigation groups, legal links and copyright. In-page navigation must work both in the assembled page and standalone section view. Source support/account/legal destinations remain source links.
- Feedback is a visible interaction requiring observation of its source dialog. A guessed local feedback service or silent form submission is outside this reconstruction.

## Responsive and review criteria

Validate against observed desktop 1440×900 and mobile 390×844 viewports. Pricing moves from three columns to the observed stacked layout; FAQ heading/rows and footer columns use source CSS rather than an inferred generic mobile arrangement. Compare source-sized section bounds, text wrapping, native focus/keyboard operation, pricing states, FAQ expansion, footer anchors and closing input. Capture variable animated demos at matched/stated states; an unmatched moving canvas does not establish a geometry defect, and a static still does not prove recovered animation.

The implementation owner must record actual assets recovered, behavior rebuilt, inaccessible behavior and dynamic-frame limits. Independent QA must inspect the delivered revision; this contract is not a runtime pass.

## Commerce implementation handoff

Implemented `src/blueprint-faithful-commerce.jsx` only, exporting `SourcePricing`, `SourceFAQ`, `SourceFinal`, and `SourceFooter`. Parent supplies `blueprint-source-parts.json` with complete exact source fragments. Pricing uses the current captured `pricingMonthly` section rather than inferred discounts: $13.30/$34.30/$97.30 first-month amounts and source `*_month` checkout destinations were confirmed from the captured DOM. Default Yearly remains $15.83/$40.83/$115.83.

React owns the pricing toggle and comparison disclosure while source content supplies plan cards/table/notes. Toggle buttons keep identity/focus while state changes replace only the non-focused card content. Native FAQ details preserve source behavior. Footer `pageHref` defaults to the parent's canonical `/?view=blueprint-page`; account/support/legal destinations resolve to the source site. An `onFeedback` callback lets the page owner supply the observed source dialog without inventing a service in this module.

The closing form's `/new` GET action and hidden `prompt` name are directly present in captured source markup. The local component resolves that action to `https://blueprint.page/new`. It uses `parts.finalPrompt` when the parent supplies an observed suggestion; it does not invent placeholder copy. Its decorative canvas remains the exact source slot for the page owner's animation handling.

Validation performed: JSX transformation and actual ReactDOMServer structural rendering. Pricing produces three plan cards and one comparison table, FAQ sixteen details rows, closing form one heading/form, and footer three navigation group headings. These are structural checks, not a rendered/browser or independent QA pass. Actual desktop/mobile appearance, monthly toggle, compare disclosure, FAQ keyboard behavior and closing/feedback flows remain for the delivered-revision review.
