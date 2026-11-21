# Publish to npm under the mcdp-adk organization

Every package in `packages/<pkg>/` is published to npm as `@mcdp-adk/<pkg>`, under the npm organization named after the GitHub owner, with `repository.url` pointing to `git+https://github.com/mcdp-adk/pi-packages.git` and `repository.directory` set to `packages/<pkg>`. An npm install gives the developer a versioned release to pin and upgrade from without cloning the monorepo, and a published name can never be reused, so it matches the package directory name under `@mcdp-adk`. Releases are published by `.github/workflows/publish.yml` through npm trusted publishing on `<pkg>@v<version>` tags, so no npm token exists and every release carries provenance. npm trusts a workflow only for a package that already exists, so a brand-new package's initial `0.1.0` release is published by hand without provenance before configuring its trusted publisher.

## Considered Options

- Git as the only install source: pi cannot install one subdirectory package cleanly from a monorepo root, and git installs follow a branch rather than a versioned release.
- Publishing every release by hand: needs no workflow, but each release depends on a logged-in machine and carries no provenance.
