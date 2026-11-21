# pi-codex-computer-use

A [pi](https://pi.dev) package that lets pi drive Windows desktop apps through the computer-use runtime bundled with the Codex desktop app.

It talks to Codex's own `node_repl` MCP server, where the model writes JavaScript against `@oai/sky`, the same way Codex uses it.

## Requirements

- Windows
- The [Codex desktop app](https://openai.com/codex), installed locally and signed in once. Open it after installation and after updates so Codex refreshes `config.toml` before starting pi.

This package ships no Codex files. It discovers and runs the Codex runtime already installed on your machine.

## Install

```sh
pi install npm:@mcdp-adk/pi-codex-computer-use
```

The extension registers the `computer_use` / `computer_use_reset` tools, and the `codex-computer-use` skill becomes available to the model.

## Use

The tools are not registered (with a single notice naming what is missing) until the Codex installation is complete; then the model can run cells in the Codex REPL. If an update leaves `config.toml` pointing at a missing runtime, open the Codex desktop app, then start a new pi session so the tools can register. The model loads the `codex-computer-use` skill before its first cell; the skill points at the Codex guidance, confirmation policy, and sky API reference in the Codex installation, and lists where driving the runtime from pi differs from driving it inside Codex.

## Tests

From the monorepo root:

```sh
npm test -w packages/pi-codex-computer-use
```

Suites that run against the real Codex runtime require a signed-in Codex installation and skip cleanly when one is not present.
