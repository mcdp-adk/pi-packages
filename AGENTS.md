# pi-packages

Read `CONTRIBUTING.md` before writing an issue, a commit, a pull request, or a comment, and `CODING_STANDARDS.md` before writing or reviewing code.

## Agent skills

### Issue tracker

GitHub Issues for `mcdp-adk/pi-packages`, through the `gh` CLI. See `docs/agents/issue-tracker.md`.

### Triage labels

The five defaults: `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`. See `docs/agents/triage-labels.md`.

### Domain docs

Multi-context: root `GLOSSARY-MAP.md` and `docs/adr/`, plus per-package `packages/<pkg>/GLOSSARY.md` and `packages/<pkg>/docs/adr/`. See `docs/agents/domain.md`.

## Packages

Each publishable package lives in `packages/<pkg>/`. Before changing a package, also read its `AGENTS.md` if it has one.

## Publishing

How a package reaches npm. See `docs/publishing.md`.

## Workspace

- **Worktrees**: set up each new worktree with `npm ci`.
