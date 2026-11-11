# Actual Claude/Codex CLI verification

Verified 6 November 2026. The user requested collaboration and second opinions through Claude Opus 5.5 and Codex Sol 6.1. Both installed CLIs completed the same bounded, synthetic film-review task in parallel. No private product material, credentials, source videos, or reference images were submitted in this probe.

| Service | Installed CLI | Explicit model argument | Exit / elapsed | Identity evidence |
|---|---|---|---|---|
| Claude Code | 2.1.307 | `claude-opus-5-5` | 0 / 14.177s | Final CLI JSON `modelUsage` contains `claude-opus-5-5` |
| Codex CLI | 0.165.0-alpha.1.2 | `gpt-6.1-sol` | 0 / 15.639s | Explicit model argument accepted and inference completed; this event stream exposes no separate served-model field |

The generated models' claims about their own identities were neither requested nor used as verification. No fallback model was requested. Claude returned one successful result turn with `is_error:false`. Codex emitted `turn.completed`, its final answer, and no tool-execution events. Its stderr contained a state-database/rollout lookup warning; the process and inference still succeeded.

The common prompt reviewed a fictional 24-second muted square routing film. Both replies identified value in following one ticket to its owner queue and proposed clearer rule-to-ticket causality and readable muted-viewing copy. These are second-opinion observations about the supplied plan, not proof that a finished movie was visually or aurally reviewed.

## Reproducible evidence

- [Synthetic prompt](validation/cli-v2/synthetic-prompt.txt)
- [Bounded test runner](validation/cli-v2/verify_cli_models.py)
- [Claude receipt](validation/cli-v2/claude-receipt.json), [reply](validation/cli-v2/claude-response.md), and raw stdout/stderr in the same directory
- [Codex receipt](validation/cli-v2/codex-receipt.json), [reply](validation/cli-v2/codex-response.md), and raw stdout/stderr in the same directory

The runner uses argument arrays and stdin, never interpolates a prompt into a shell command, gives each CLI a clean temporary working directory, and imposes a 120-second timeout per call. Claude uses `--safe-mode`, no tools, `--no-session-persistence`, and denied permission prompts. Codex uses `--ignore-user-config`, `--ephemeral`, `--sandbox read-only`, and the synthetic prompt's no-tools instruction. Normal existing CLI authentication was used; credential files were not inspected by this test.

## Visual and execution scope

This probe was text-only. Codex's installed help exposes `--image`; Claude's installed help does not expose an equivalent direct image flag. The production bridge can stage contact sheets and ask Claude's Read tool to open them, with permissions confined to the worker directory. That visual transport is a separate test performed by the main workflow, not an achievement claimed by this probe.

For optional Claude shell testing, the [official sandbox guide](https://code.claude.com/docs/en/sandboxing) supports session-only settings of this shape:

```json
{"sandbox":{"enabled":true,"autoAllowBashIfSandboxed":true,"allowUnsandboxedCommands":false,"failIfUnavailable":true,"excludedCommands":[]}}
```

The shell sandbox and file-tool permissions are separate boundaries. This configuration was verified from documentation; it was not exercised by the no-tools probes above.

## Primary documentation

Exact model names were checked against [OpenAI's GPT-6.1 Sol page](https://developers.openai.com/api/docs/models/gpt-6.1-sol) and [Anthropic's Claude Opus 5.5 page](https://platform.claude.com/docs/en/models/opus-5-5/overview). The command interfaces were checked against local `--help` output and the [Codex non-interactive guide](https://learn.chatgpt.com/docs/non-interactive-mode) / [Claude CLI reference](https://code.claude.com/docs/en/cli-reference). Documentation establishes the interfaces; the preserved execution receipts establish that these particular calls worked in this account/environment.
