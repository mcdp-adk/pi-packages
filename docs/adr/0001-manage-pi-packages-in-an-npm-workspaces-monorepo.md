# Manage pi packages in an npm workspaces monorepo

All public `@mcdp-adk` pi packages live under `packages/<pkg>/` in one npm workspaces monorepo (`mcdp-adk/pi-packages`). Each package keeps its own `package.json`, independent semver version, README, glossary, package-scoped ADRs, source, and tests, while sharing one root copy of TypeScript, knip, commitlint, `CODING_STANDARDS.md`, `CONTRIBUTING.md`, check scripts, and GitHub Actions workflows. Releases are triggered per package with `<pkg>@v<version>` tags through one `publish.yml` workflow.

## Considered Options

- Separate repository per package: duplicates workflows, check scripts, devDependencies, and contributor docs in every new package, causing them to drift apart.
- pnpm or Turborepo workspaces: adds a second package manager or task runner when `npm` already ships with Node 24, runs `npm ci` and `npm publish -w` natively, and supports npm trusted publishing without extra tooling.
