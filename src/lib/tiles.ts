import type { TileContent } from '@/types/config';

type ComponentLoader = () => Promise<{ default: unknown }>;

export const tileComponents: Record<TileContent, ComponentLoader> = {
  about: () => import('@/tiles/AboutTile.astro'),
  experience: () => import('@/tiles/ExperienceTile.astro'),
  education: () => import('@/tiles/EducationTile.astro'),
  skills: () => import('@/tiles/SkillsTile.astro'),
  projects: () => import('@/tiles/ProjectsTile.astro'),
  certifications: () => import('@/tiles/CertificationsTile.astro'),
  contact: () => import('@/tiles/ContactTile.astro'),
  custom: () => import('@/tiles/CustomTile.astro'),
};

export function getTileComponent(content: TileContent): ComponentLoader {
  return tileComponents[content];
}
