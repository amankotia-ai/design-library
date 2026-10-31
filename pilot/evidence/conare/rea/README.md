# Conare REA source capture

31 October 2026. Target: https://conare.ai/; public homepage, isolated headless Chrome profile. The existing checkout at `Panorama/rea-reference` stalled reading a cloud-backed `node_modules/zod/v4/locales/es.js`, so the same REA 6.4.0 published package was installed into `/tmp/conare-rea-run` with scripts disabled. No existing REA installation was modified. Runtime: Node 24.18.0.

```sh
npm install --prefix /tmp/conare-rea-run rea-agents@6.4.0 --ignore-scripts --no-audit --no-fund
'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' --headless=new --remote-debugging-port=9348 --user-data-dir=/tmp/conare-rea-chrome --window-size=1440,900 --disable-gpu --no-first-run 'https://conare.ai/'
node /tmp/conare-rea-run/node_modules/rea-agents/scripts/rea.mjs list-browser-targets http://127.0.0.1:9348 --format json --full-output > targets.json
node /tmp/conare-rea-run/node_modules/rea-agents/scripts/rea.mjs inspect-web-page http://127.0.0.1:9348 6576BBD8AB9458BF6981643D61BE5699 --observation-ms 1000 --include-accessibility-text --format json --full-output > inspection.json
node /tmp/conare-rea-run/node_modules/rea-agents/scripts/rea.mjs capture-web-screenshot http://127.0.0.1:9348 6576BBD8AB9458BF6981643D61BE5699 --format json --full-output > screenshot.json
```

REA `inspection.json` evidence ID `ev_5901c23dd6c34ca252b5cddcab6bec50298404c0fd33469a9c87aa6dbeb8527f`; screenshot ID `ev_7bae5c834c1982d81efc457bf64641ff3339e648a6d499ca37c38418c6a4ec74`. `source.png` is the screenshot artifact decoded without alteration, SHA-256 `8c6dcd75125db072e15fbb4c66b5c0f97b90d4abc62ce1584ab17c10efd0ab06`, actual viewport 1440 × 813. The source demonstration automatically changes active use-case; this capture shows Finance.

The inspection is attach-limited and policy-filtered: earlier network activity was unavailable and non-target-origin resources and scripts were excluded. It does not establish the source application's code or unseen behavior. The screenshot covers the visible viewport only; REA did not scroll or evaluate JavaScript. Source copy and visual identity belong to Conare.
