import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';
import { HyprfolioConfigSchema } from './schema';
import type { HyprfolioConfig } from '@/types/config';

let cachedConfig: HyprfolioConfig | null = null;

export function loadConfig(): HyprfolioConfig {
  if (cachedConfig) return cachedConfig;

  const configPath = path.resolve(process.cwd(), 'hyprfolio.config.yaml');

  if (!fs.existsSync(configPath)) {
    throw new Error(
      `Config file not found: ${configPath}\nCreate hyprfolio.config.yaml in the project root.`,
    );
  }

  const raw = fs.readFileSync(configPath, 'utf-8');

  let parsed: unknown;
  try {
    parsed = yaml.load(raw);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    throw new Error(`YAML parse error in hyprfolio.config.yaml:\n${message}`);
  }

  const result = HyprfolioConfigSchema.safeParse(parsed);

  if (!result.success) {
    const issues = result.error.issues
      .map((issue) => {
        const path = issue.path.join('.');
        return `  • ${path || '(root)'}: ${issue.message}`;
      })
      .join('\n');
    throw new Error(
      `Config validation failed:\n${issues}\n\nFix the errors in hyprfolio.config.yaml and try again.`,
    );
  }

  cachedConfig = result.data;
  return cachedConfig;
}
