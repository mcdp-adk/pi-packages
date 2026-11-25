# Publishing a package

How a package in `packages/<pkg>/` reaches npm. The decision to publish, the name `@mcdp-adk/<pkg>`, and the `repository` fields are `docs/adr/0003-publish-to-npm-under-the-mcdp-adk-org.md`. Every release after the first is the header of `.github/workflows/publish.yml`.

## Commands that prompt

`npm login`, the first `npm publish`, and `npm trust` each prompt for a one-time code. The owner runs them in their own PowerShell 7 terminal. An agent shell cannot enter the code, so it leaves the command with the owner and stops. `npm trust` requires npm 11.15.0 or newer.

On npm the packages are owned by the user `mcdp2alh`.

## The manifest

`publishConfig`, `repository`, and `keywords` match the other `packages/*/package.json`. A scoped package is restricted unless it is published with public access, which is why those manifests set `publishConfig.access` to `public` and why `.github/workflows/publish.yml` passes `--access public`. The keyword `pi-package` makes the package eligible for the gallery at `https://pi.dev/packages`.

The gallery lists `@mcdp-adk/<pkg>` when the command below prints that name. The query matches the unscoped name, so a package under another scope can appear on its own line and does not count:

```sh
curl -s 'https://pi.dev/packages?name=<pkg>' | grep -o 'data-package-name="[^"]*"'
```

## The first release

Publish `0.1.0` from a clean checkout of `main`, and do not tag it. A `<pkg>@v<version>` tag is what `.github/workflows/publish.yml` publishes.

1. With `version` at `0.1.0`, `npm pack --dry-run -w packages/<pkg>` lists the tarball, which is the set of files that will be published. Merge that to `main` before publishing.
2. The owner runs `npm login`, then `npm publish --access public -w packages/<pkg>`.
3. The publish has succeeded when `npm view @mcdp-adk/<pkg> versions` lists `0.1.0`, the same check as the header of `.github/workflows/publish.yml`. The registry can take a few minutes to serve it; do not publish it again while waiting. The list includes `0.0.0-stage`; leave it.
4. Immediately before the first tag is pushed, the owner runs the `npm trust` command in the header of `.github/workflows/publish.yml`. The package has to exist first (`docs/adr/0003-publish-to-npm-under-the-mcdp-adk-org.md`), and a new trusted publisher expires if it has not published within 2 days. A publisher created after 2026-09-03 cannot run `npm publish` unless `--allow-publish` is set; the workflow runs `npm publish`, which is why that command passes the flag.

`actions/setup-node` in `.github/workflows/publish.yml` has no `registry-url`. Setting one writes `_authToken=${NODE_AUTH_TOKEN}`, and with no token npm treats authentication as configured and does not use the workflow's OIDC.
