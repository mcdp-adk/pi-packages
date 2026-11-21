# Write all code in TypeScript without a build

All code in the repo is TypeScript — every package's `src/` and `test/`, root `scripts/`, and tool configs — checked by the TypeScript compiler in `npm run lint`, with no build step: pi loads each package's `.ts` entry point directly through its jiti loader, Node runs the tests and scripts by stripping their types, and published packages ship `.ts` source. Agents write most of this code and the owner reviews little of it line by line, so a type error that fails in seconds is worth more here than in a hand-written codebase. With every file under the compiler, `strict` and unused-name checks cover what a JavaScript linter would, so the repo has no ESLint. Only erasable syntax is allowed, so the source Node and pi run is exactly the source in the repo. The git hook stays a shell script, the only form git runs.

## Considered Options

- JavaScript with JSDoc annotations checked through `checkJs`: proves less — parsed JSON/TOML and caught errors stay weakly typed, annotations rot separately from code, and nothing blocks non-strippable syntax.
- Compiling to JavaScript before publishing: the code pi runs would differ from the repo source, every release would depend on a build step staying in sync, and debugging an installed package would mean reading generated files.
