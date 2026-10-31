# Product constraints — remove card footer rows

Reviewer: `/root/product_design`. Inspected both supplied screenshot crops using the image viewer and current `catalog.jsx`, `page-browser.jsx`, `catalog.css`, and shared SystemCard construction. No UI edits.

The crops identify the complete bottom rows, including their top divider: Section category plus Preview; Page Preview shell plus Open page.

- Remove each Section card's `.card-bottom` element, including category label, Preview link, and divider.
- Remove each Page card's `.card-bottom` element, including Preview shell, Open page, and divider.
- Preserve heading links as the card's entry to its existing detail page. Section thumbnails already supply an additional pointer entry. Existing page detail Open page actions preserve full-page access.
- Preserve card names, descriptions, page type/mode/system association, section counts, previews, filters, and responsive structure.
- Keep Design Systems' footer row, section count, and Explore system action. Avoid a global `.card-bottom` hide/removal because it is shared by SystemCard.
- Clean up only CSS rules that target removed Section/Page footer rows. Preserve common footer rules needed by Design Systems.

Review criteria: no Section or Page card contains the removed footer row or divider; titles still navigate to their corresponding detail destinations; Design Systems retains its footer and Explore system action; narrow cards retain the same content and no overflow.

Status: constraints delivered. Implementation and delivered-revision QA remain separate.
