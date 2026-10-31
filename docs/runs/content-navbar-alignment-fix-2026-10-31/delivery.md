# Alignment correction

User reported page content still narrower than navbar. Measured current rendered mismatch: desktop navbar24px versus content32px; mobile navbar16px versus content24px. A subsequent header spacing change left the content's independent gutter behind.

Only pilot/src/library-tokens.css changed: --library-page-gutter now aliases --library-header-inset, and its mobile override is removed. All existing content/notice rules continue using the gutter. Navbar, grid, preview, typography and vertical spacing source rules remain unchanged. No changes to embedded source pages or Render Assets.

The actual specialist passes are /root/visual_analysis, /root/product_design, /root/art_direction. Parent coordinated/implemented; /root/independent_qa owns final review in independent-qa.md. Delivered source revision: delivered-sha256.txt. Source copied to the pre-existing retained runtime /tmp/design-library-pilot-runtime at http://127.0.0.1:5175/?panel=sections.

Build passed. Parent verification covered6panels at1440/900/390/320px: actual brand left, nav right, header inner bounds, content edges, and notice edges all match; no horizontal overflow. Twelve screenshots and validation.json are provided. Existing source-input checks were unaffected by this CSS-only change. No new asset/font recovery claims.
