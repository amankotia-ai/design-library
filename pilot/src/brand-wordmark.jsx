import React from 'react';

const name = 'Design Library';
// Optical corrections on top of Geist Serif's native kerning, in 1/1000 em.
const pairAdjustments = {De: -25, es: -15, ig: 4, gn: 12, br: 4, ry: -6};
const offsets = Array.from(name, (_, index) =>
  index ? pairAdjustments[name.slice(index - 1, index + 1)] ?? 0 : 0
).join(' ');

export function BrandWordmark() {
  return <span className="brand-name" role="img" aria-label={name}>
    {/* Native advance 6582 + optical corrections -26 = 6556 font units.
        One text node retains the font's shaping; dx adjusts only chosen pairs. */}
    <svg className="brand-lettering" viewBox="0 0 6556 1000" aria-hidden="true">
      <text x="0" y="1000" dx={offsets}>{name}</text>
    </svg>
  </span>;
}
