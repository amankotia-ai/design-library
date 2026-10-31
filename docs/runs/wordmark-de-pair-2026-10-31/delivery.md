# D–e correction

Added only `De: -25` to the live wordmark's optical pair map (−0.025em; 0.7px tighter at 28px type). All other pair adjustments are unchanged. Updated both SVG advance and CSS width from 6596 to 6571 font units, keeping the signature gap at 4px and preserving the baseline, size, and shape.

Actual 3× captures cover desktop, mobile and narrow 320px. Browser checks passed for the accessible home-link name, image load, corrected dx sequence, unchanged signature gap and no horizontal overflow. Production build passed in the runtime mirror. Delivered component/CSS hashes are recorded in revision-sha256.txt.

The user feedback replaces the earlier recommendation to leave De native. Prior visual/product constraints remain applicable; `/root/typography_art` inspected the actual correction against the supplied screenshot, while `/root/typography_qa` independently reviews the delivered revision. Their reports are in this run; qa.md carries the final independent verdict. No other pair or asset was changed.
