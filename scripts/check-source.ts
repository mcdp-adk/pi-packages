// Checks the two rules in CODING_STANDARDS.md that a pattern decides across
// every workspace package: a test reaches its package only through a pi SDK
// session (One seam), and a comment names no ticket (Lasting behavior and its
// reason). Runs in `npm run lint`.
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const problems: string[] = [];

function checkDir(dir: string, isTestDir: boolean): void {
  if (!existsSync(dir)) return;
  for (const name of readdirSync(dir, { recursive: true, encoding: 'utf8' })) {
    if (!name.endsWith('.ts')) continue;
    const file = join(dir, name);
    readFileSync(file, 'utf8')
      .split(/\r?\n/)
      .forEach((line, index) => {
        const at = `${file}:${index + 1}`;
        if (isTestDir && /['"](?:\.\.\/)+src\//.test(line)) {
          problems.push(`${at}: a test imports src/ (One seam)`);
        }
        const comment = line.match(/(?:^|\s)\/\/(.*)$/)?.[1];
        if (comment) {
          const withoutUrls = comment.replace(/https?:\/\/\S+/g, '');
          if (/\bticket\b|#\d+/i.test(withoutUrls)) {
            problems.push(`${at}: a comment names a ticket (Lasting behavior and its reason)`);
          }
        }
      });
  }
}

if (existsSync('packages')) {
  for (const entry of readdirSync('packages', { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const pkgDir = join('packages', entry.name);
    checkDir(join(pkgDir, 'src'), false);
    checkDir(join(pkgDir, 'test'), true);
  }
}

if (problems.length) {
  console.error(problems.join('\n'));
  process.exit(1);
}
