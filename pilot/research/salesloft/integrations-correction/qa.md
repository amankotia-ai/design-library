# Independent QA: Salesloft integrations correction

Reviewer: `/root/integration_qa`, 31 October 2026. Status: **passed within the scope below** for the revision identified by hashes here. This is a visual and bounded browser review, not a claim of pixel identity, cross-browser compatibility, screen-reader certification, or recovered source behavior.

I directly inspected the original 4096 × 2460 user-supplied source, its normalized 1440 × 865 image `public/references/salesloft/integrations-comparison.png`, the delivered 1440 × 865 implementation `evidence/salesloft/integrations.png`, and `evidence/salesloft/integrations-mobile.png`. The corrected desktop restores the reference's four-line statement, staggered positions and recognizable source-cropped marks, converging curves, metric centers and surrounding white space. Font rendering and authored curve geometry remain approximations. The 390px mobile image is an adaptation because no original mobile layout was supplied.

Initial finding: at 801px the desktop proportional layout made metric text approximately 9.6px. The implementer extended the stacked adaptation through 1250px. Retested at 801, 1024 and 1250px: body width equaled viewport width, metric labels were 15px and title 27px. At 1251px the desktop layout uses 15.01px metric labels. At 1440, 768, 390 and 320px, there was no horizontal page overflow, all ten marks loaded, and no page errors. The full assembled page at 1440 and 320px contains one h1 and one labeled integration section; all marks load. The integration illustration is decorative and non-interactive, and its values and labels are a description list.

I exercised the section detail Compare button at `/?panel=sections&section=salesloft-integrations`: both source and implementation images loaded at 1440 × 865; overlay selection and the opacity slider worked, with no page errors. This inspection does not establish unseen source interactions.

Inspected workspace and isolated runtime source and media hashes matched:

- `src/salesloft.jsx`: `8c44863f6ddf2237a1894616436a4cb8d6e411798692fdf15251c4c56e46441b`
- `src/salesloft-integrations.css`: `3fe46af83b0b8bf79b4663fce00dbed09496f177976bb0e8ce467013982dea3f`
- `src/data.js`: `2b85a254a09b38db0dd8d73355d7e0b3d352afe7fcf37d64954356245b22bfd5`
- `src/main.jsx`: `e5bc9e195772135618105dbdfd07165a6cd2fa45cd02230fb45088eea89dff69`
- Normalized source image: `c90a1c42d0f25e37e116d0d9917a9434e00bcf83857c538119005113462794e1`
- Implementation comparison / desktop screenshot: `2477e812a7bfd121bfd3b30f87e6ddd962fb1c5398261d695acc40c2d20d0914`
- Mobile screenshot: `d13a369c42eccd8cfd0b2b3fa4e58958d06bbd6a691f2fe48284f41bf7065159`
- SHA-256 of the sorted `shasum -a 256 public/assets/salesloft/integrations/*.png` output: `c32dedd984c75b66dce413ff9040159a04a175c9b3cb62b9628107395b9f93bd`.

Any later changes to the reviewed source or evidence invalidate the affected portions of this review.
