# REA capture: Conare evaluations overview

31 October 2026. Public source: https://conare.ai/evals. REA `rea-agents@6.4.0` ran from a temporary isolated installation using Node 24.18.0 and a dedicated headless Chrome CDP profile on loopback port 9350. The prior checkout was known to stall on a cloud-backed dependency, so it was not modified.

Commands, with the actual source target ID:

```sh
npm install --prefix /tmp/conare-evals-rea rea-agents@6.4.0 --ignore-scripts --no-audit --no-fund
'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' --headless=new --remote-debugging-port=9350 --user-data-dir=/tmp/conare-evals-chrome --window-size=1440,900 --disable-gpu --no-first-run 'https://conare.ai/evals'
node /tmp/conare-evals-rea/node_modules/rea-agents/scripts/rea.mjs list-browser-targets http://127.0.0.1:9350 --format json --full-output > targets.json
node /tmp/conare-evals-rea/node_modules/rea-agents/scripts/rea.mjs inspect-web-page http://127.0.0.1:9350 6C179E8E5EE09DBCC0ED408637E4CDF2 --observation-ms 1000 --include-accessibility-text --format json --full-output > inspection.json
node /tmp/conare-evals-rea/node_modules/rea-agents/scripts/rea.mjs capture-web-screenshot http://127.0.0.1:9350 6C179E8E5EE09DBCC0ED408637E4CDF2 --format json --full-output > screenshot.json
```

Inspection evidence `ev_d164a3f2f901db7f426e15494964c6275cd4789c5c397c37a96d7d0f82d5ddfd`; screenshot `ev_ca5841ce4611c6593c181667238734fe1ba06160d40879b798bb500d87cc3305`. `source.png` is the decoded screenshot artifact without alteration, 1440 × 813, SHA-256 `f3b85958f63e35c67c78c9c00f52665aaef7fb4f9287915551945f6ee3476c1d`.

Inspection attaches after page load and excludes events without a proven target origin; earlier requests and unseen behavior are unavailable. The screenshot covers the visible viewport only, without scrolling or evaluating JavaScript. Source text, brand and benchmark claims belong to Conare.
