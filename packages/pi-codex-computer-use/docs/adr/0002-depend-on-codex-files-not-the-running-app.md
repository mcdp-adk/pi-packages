# Depend on Codex's installed files, not the running Codex app

The host launches the REPL from the Codex runtime's files with Codex's own environment, minus the two variables that route the helper through the running Codex app (`SKY_CUA_NATIVE_PIPE`, `SKY_CUA_NATIVE_PIPE_DIRECTORY`), plus `NODE_REPL_DISABLE_ANALYTICS=1`, and passes `--disable-sandbox` to the REPL. The REPL then starts its Node processes and helper directly while keeping Codex's configured `CODEX_CLI_PATH` for the helper, so computer use works whether or not Codex is open and without a standalone `codex` CLI on `PATH`, never shares a helper with Codex, follows one code path, and sends no analytics; the variables are set only on the launched process, never persisted.

## Consequences

- Browser windows fail the helper's URL policy; browsers are out of scope.
- This is the path Codex itself does not use on Windows, so an update can break it unnoticed; failures surface as the runtime's own errors.
- Without `--disable-sandbox`, keeping `CODEX_CLI_PATH` makes the REPL wrap its Node processes in `codex.exe sandbox`, under which the helper's `codex app-server` child exits before returning response 1. Stripping `CODEX_CLI_PATH` instead made the helper fall back to `codex` on `PATH` and fail with "failed to launch codex app-server: program not found" when only the Codex desktop app is installed.
- The helper launches Codex's bundled `codex app-server` from `CODEX_CLI_PATH` (observed in `codex-computer-use.exe` auth/policy code and by its failure when `CODEX_CLI_PATH` is absent with no `codex` on `PATH`); the REPL's own Node processes run outside `codex sandbox`.
- With this environment no network connections were observed from the launched processes (polling only, not packet capture; error paths not exercised).
