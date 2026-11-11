# Use in Codex and Claude Code

Use the same `software-film-director` folder in either host. Copy it into a project at `.agents/skills/software-film-director` for Codex or `.claude/skills/software-film-director` for Claude Code. For personal use, the corresponding locations are `~/.codex/skills/software-film-director` and `~/.claude/skills/software-film-director`. Keep only one maintained source and copy/relink updates intentionally.

Invoke `$software-film-director` in Codex or `/software-film-director` in Claude Code, or describe a software launch/feature/VSL film. `agents/openai.yaml` supplies optional Codex UI metadata; Claude does not require it.

Paths are relative to the loaded skill. Adapt file, shell, browser, media generation, and agent calls to tools actually available in the host. No Codex connector, paid model, fixed image-generation model name, or external agent framework is required. If a host cannot spawn agents, run the role passes sequentially. If no image-generation tool is available, use supplied/sourced assets or create suitable graphics in code.

The analysis helper needs Python 3, FFmpeg, and ffprobe, with no pip packages. The optional browser starter needs Node 20+, its pinned npm packages, Playwright Chromium, FFmpeg, and ffprobe. Dependency installation can require network access. See `references/runtime.md`; the starter's initial graphic is only a calibration scene.

For the personal parallel workflow, install/sign in to the normal Claude Code and Codex CLIs with access to the requested models, then run `python3 scripts/film_team.py doctor` from this folder. The role prompts under `agents/roles/` are loaded by the bridge or a host agent call; no separate native-agent configuration installation is required. This runner pins exactly `claude-opus-5-5` and `gpt-6.1-sol`. See [CLI collaboration](references/cli-collaboration.md) for preparing/running real stage waves, reciprocal reviews, isolated work and retained receipts. The active host director integrates the outputs.

Contact-sheet/frame-layout production is required throughout. Use `python3 scripts/contact_sheet.py selected-frames.json NEW_OUTPUT --stage storyboard` and attach its actual PNGs plus manifest to visual jobs. See [the stage protocol](references/contact-sheets.md). The helper uses Python/FFmpeg without extra fonts or Python packages.

Large research media, source-repository clones, and study sheets are kept in the MovieMaker project's `research/` directory and excluded from the distributable skill. The skill includes distilled evidence and links, so its operation does not require those large files. Downloading study media does not grant permission to reuse it in commercial output.

Claude locations and invocation verified against the [official Claude Code skills guide](https://code.claude.com/docs/en/skills) and [Agent Skills overview](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview#claude-code), checked 6 November 2026.
