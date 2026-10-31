# Signature scale correction

Changed only `pilot/src/library-tokens.css`: signature box 88 × 32 → 104 × 38px desktop; 82 × 30 → 96 × 35px mobile; 76 × 28 → 88 × 32px at narrow widths. This enlarges the existing transparent lettering about 16–18% to address the user's optical-size feedback. The lettering asset, red ink, Serif wordmark, and accessible text are unchanged.

Actual captures and browser bounds are in this run. No horizontal overflow at 1440/768/390/320px. At 320px the full brand occupies 269.66px of the available 272px. Production build passed in the established runtime mirror; the affected CSS matches the workspace.

Roles: `/root` implementation; `/root/typography_visual` actual reference analysis; `/root/typography_product` live fit and accessible link review; `/root/typography_art` rendered balance review; `/root/typography_qa` independent final revision review. Each review is recorded in its own file; final QA status is authoritative in qa.md. Source SHA-256 is recorded in revision-sha256.txt.
