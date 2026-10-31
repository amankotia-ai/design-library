# System preview primary colors

Start: 2026-10-31 06:21:40 IST. Deadline: 06:41:40 IST (20 minutes).
Scope: the Plasticity, MNH, and Signal Grid specimens in the design-system browser shown in the supplied screenshot. This is a library presentation adaptation, not a claim about source-site backgrounds.
Completion: use each system's distinguishing primary color with legible type and swatches; inspect the rendered revision and complete independent QA, then run the applicable build/checks.
Reference: user screenshot at /var/folders/tx/z_rvf2qn2wz6sjz__fnlmmd40000gn/T/TemporaryItems/NSIRD_screencaptureui_E5zs6O/Screenshot 2026-10-31 at 6.21.09 AM.png. System palettes and source descriptions are in pilot/src/plasticity-data.js, mnh-data.js, and conare-data.js. Freebyrd index, thread, and references returned no folder context.
Specialists: visual_analysis, product_design, art_direction; independent QA follows implementation.

## Implementation and review

Plasticity previously fell through to the Blueprint specimen while naming its colors Black and White rather than Ink and Paper. MNH and Signal Grid explicitly selected paper. The catalog now uses Plasticity black (#000000), MNH ink (#050505), and Signal Grid red (#ea3325), with contrasting text and swatch borders. MNH's actual homepage uses a white ground; the dark card is a catalog treatment, not a source-fidelity claim.

Visual analyst: /root/visual_analysis inspected the supplied screenshot, source, and retained Plasticity and MNH captures. Product designer: /root/product_design reviewed the implementation and palette semantics. Art director: /root/art_direction inspected the source and supplied screenshot and recommended the palette/contrast treatment. Independent QA: /root/independent_qa inspected the supplied original, preview.png, current source, and live desktop preview and passed the delivered desktop revision; no relevant clipping or swatch visibility issues found.

Reviewed SHA-256: system-preview.jsx 81a19282452bd2950bb163bda62dc0379a6f6856c674969654712d6fac985fb5; system-preview-tokens.css b41c6e11bf68d08edebeb4f1bd4e8b23fcde64927a6ab9256ee90ad39a1a79b7; preview.png b11d7a33ce97c6feb0b9c403427078d8339fc29aae70013e81b5de48908d2f96. Vite production build passed; emitted a bundle-size warning. Desktop preview reviewed; no claim of mobile visual review.
