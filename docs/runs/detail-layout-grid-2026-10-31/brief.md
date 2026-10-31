# Temporary detail layout grid

Start: 2026-10-31 06:25:31 IST. Deadline: 06:45:31 IST (20 minutes).
Scope: add a temporary toggle and non-interactive overlay for the system detail page layout in the supplied screenshot. Overlay follows the actual 2fr/3fr desktop shell, content/preview insets, and single-column mobile layout, rather than the embedded source site's grid. Default off, no persistence.
Completion: toggle on and off with accessible state; overlay aligns with the current shell, does not intercept pointer input, and adapts to mobile. Build and independent review of the rendered revision.
Reference: /var/folders/tx/z_rvf2qn2wz6sjz__fnlmmd40000gn/T/TemporaryItems/NSIRD_screencaptureui_yD3OkY/Screenshot 2026-10-31 at 6.24.50 AM.png. Freebyrd index, thread, and references returned no folder context.
Specialists: /root/grid_visual, /root/grid_product, /root/art_direction; independent QA follows implementation.

Visual analyst /root/grid_visual inspected the supplied screenshot and shell CSS, establishing the 2fr/3fr split and 701px breakpoint. Product designer /root/grid_product recommended the default-off accessible toggle and non-interactive overlay. Art director /root/art_direction reviewed the screenshot and source and recommended subtle viewport-aligned guides. Independent QA /root/grid_qa inspected the screenshot, source and live output at desktop and 390×844: passed toggle state, pointer and Space interaction, mobile insets, desktop split and padding alignment, and embedded preview interaction with the overlay on.

Reviewed SHA-256: system-browser.jsx e7f74893abfb5dfbc9682b90275cb76f93f4fd593a34c598fc6384e020773610; system-browser.css 55576e16425cac66f4273348b7e0689cf8650ee23cf61852fb6220983d48074a. Production build passed with existing bundle-size and module directive warnings. The captured full-page screenshots do not render the embedded iframe, so live preview interaction was checked independently.
