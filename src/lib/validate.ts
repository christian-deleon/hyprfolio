import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';
import { HyprfolioConfigSchema } from './schema';

const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const CYAN = '\x1b[36m';
const DIM = '\x1b[2m';
const RESET = '\x1b[0m';
const BOLD = '\x1b[1m';

function log(msg: string) {
  console.log(msg);
}

function main() {
  log(`\n${BOLD}${CYAN}hyprfolio${RESET} config validator\n`);

  // Stage 1: File exists
  const configPath = path.resolve(process.cwd(), 'hyprfolio.config.yaml');
  log(`${DIM}Checking${RESET} ${configPath}`);

  if (!fs.existsSync(configPath)) {
    log(`\n${RED}✗${RESET} File not found: hyprfolio.config.yaml`);
    log(`  Create the config file in the project root.\n`);
    process.exit(1);
  }
  log(`${GREEN}✓${RESET} File found`);

  // Stage 2: Valid YAML
  const raw = fs.readFileSync(configPath, 'utf-8');
  let parsed: unknown;
  try {
    parsed = yaml.load(raw);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    log(`\n${RED}✗${RESET} YAML parse error:`);
    log(`  ${message}\n`);
    process.exit(1);
  }
  log(`${GREEN}✓${RESET} Valid YAML`);

  // Stage 3: Schema validation
  const result = HyprfolioConfigSchema.safeParse(parsed);

  if (!result.success) {
    log(`\n${RED}✗${RESET} Schema validation failed:\n`);
    for (const issue of result.error.issues) {
      const path = issue.path.join('.');
      log(`  ${YELLOW}${path || '(root)'}${RESET}: ${issue.message}`);
    }
    log(`\n  ${DIM}${result.error.issues.length} issue(s) found${RESET}\n`);
    process.exit(1);
  }

  log(`${GREEN}✓${RESET} Schema valid`);

  // Summary
  const config = result.data;
  log(`\n${BOLD}Summary:${RESET}`);
  log(`  ${DIM}Name:${RESET}    ${config.profile.name}`);
  log(`  ${DIM}Title:${RESET}   ${config.site.title}`);
  log(`  ${DIM}Tiles:${RESET}   ${config.tiles.length}`);
  log(`  ${DIM}Palette:${RESET} ${config.palette.default}`);

  const sections = [
    ['experience', config.experience.length],
    ['education', config.education.length],
    ['skills', config.skills.length],
    ['projects', config.projects.items.length],
    ['certifications', config.certifications.length],
  ].filter(([, count]) => (count as number) > 0);

  if (sections.length > 0) {
    log(
      `  ${DIM}Content:${RESET} ${sections.map(([name, count]) => `${count} ${name}`).join(', ')}`,
    );
  }

  log(`\n${GREEN}${BOLD}✓ Config is valid!${RESET}\n`);
}

main();
