# Baseline and spacing revision

Changed only shared library typography CSS. The signature is shifted down 2px on desktop and 1px on mobile to align its visible handwriting body with the Serif baseline. The inter-element gap after “Design Library” is now 12px desktop and 10px mobile, replacing the previous 8px. The enlarged lettering dimensions remain intact, including at 320px.

Baseline evidence uses an inline marker in the live Serif line box and an optical handwriting baseline inferred from the lower edge of the main “Manks” body (source y≈534 in the 2079 × 756 asset). This is optical alignment of an image and live text, not recovered font metrics for the handwriting. Measured differences after correction are approximately −0.20px desktop, +0.20px at 390px, and −0.40px at 320px. The intentional f descender extends below that line.

Actual captures and verification.json cover 1440,768,390,320px. No horizontal overflow or image-load failures; the narrow brand occupies 271.66px of the 272px available. Production build passed in the established local runtime; current affected CSS matches workspace source. Revision SHA-256 is recorded separately.

Roles: `/root` implementation and measured captures; `/root/typography_visual` actual previous crop/reference assessment; `/root/typography_product` spacing and narrow-fit constraints; `/root/typography_art` actual current rendered baseline/spacing review; `/root/typography_qa` independent final review, authoritative status in qa.md. No other logo assets, layout, or source-study fonts were changed by this correction.
