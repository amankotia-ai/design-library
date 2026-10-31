# Closer signature spacing

Only three signature margin values changed in library-tokens.css. The effective box gap is now 4px at desktop/mobile/narrow widths; it was 12px desktop and 10px mobile. The transparent lettering asset adds its own small optical inset. Enlarged signature dimensions and 2px desktop / 1px mobile baseline shifts are unchanged.

Actual desktop, mobile and 320px captures show the reduced distance. Browser checks confirm the 4px gap, preserved baseline transforms, successful image load and no overflow at all three widths. Build passed in the established runtime mirror, using the same affected CSS as workspace source.

Parent `/root` implemented and captured this correction. Prior visual/product passes still govern size and semantics. `/root/typography_art` inspected the current crops against the supplied screenshot; `/root/typography_qa` independently reviews the delivered revision with its verdict in qa.md. Hashes and captures are retained in this run. No asset or other typography changes.
