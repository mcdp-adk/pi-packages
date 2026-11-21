// Conventional Commits, enforced locally by the .githooks/commit-msg hook and
// in CI by `npx commitlint --from ... --to ...`. This repo's commits are a
// single-line title of at most 72 characters: no scope (`fix(repl): x` is
// rejected; `fix: x` passes), no body, and no footer. Every message is linted,
// including a bare version such as `0.2.0`, which commitlint skips by default.
import type { UserConfig } from '@commitlint/types';

const config: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  defaultIgnores: false,
  rules: {
    'header-max-length': [2, 'always', 72],
    'scope-empty': [2, 'always'],
    'body-empty': [2, 'always'],
    'footer-empty': [2, 'always'],
  },
};

export default config;
