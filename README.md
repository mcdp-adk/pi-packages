# pi-packages

Public [pi](https://pi.dev) packages published under the `@mcdp-adk` npm organization.

## Packages

| Package | Description | Install |
| --- | --- | --- |
| [`@mcdp-adk/pi-codex-computer-use`](./packages/pi-codex-computer-use) | Drive Windows desktop apps through the Codex desktop app's computer-use runtime | `pi install npm:@mcdp-adk/pi-codex-computer-use` |
| [`@mcdp-adk/pi-telegram-notify`](./packages/pi-telegram-notify) | Send a Telegram message when pi finishes, fails, or waits on you | `pi install npm:@mcdp-adk/pi-telegram-notify` |

## Development

Requires Node.js `>=22.19.0`.

```sh
npm ci
npm run lint
npm test
```

To run tests for one package:

```sh
npm test -w packages/pi-telegram-notify
```
