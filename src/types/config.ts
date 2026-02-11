import type { z } from 'zod';
import type {
  HyprfolioConfigSchema,
  WindowTypeEnum,
  TileContentEnum,
  PaletteIdEnum,
  SiteSchema,
  SEOSchema,
  AnalyticsSchema,
  ProfileSchema,
  SocialLinkSchema,
  ContactSchema,
  AboutSchema,
  PaletteSchema,
  WallpaperSchema,
  WaybarSchema,
  LayoutSchema,
  AnimationsSchema,
  TileDefinitionSchema,
  ExperienceItemSchema,
  EducationItemSchema,
  SkillCategorySchema,
  SkillItemSchema,
  ProjectItemSchema,
  ProjectsGithubSchema,
  ProjectsSchema,
  CertificationItemSchema,
  AwardItemSchema,
  PublicationItemSchema,
  SpeakingItemSchema,
  VolunteerItemSchema,
  LanguageItemSchema,
  InterestItemSchema,
  ReferenceItemSchema,
  TestimonialItemSchema,
  ServiceItemSchema,
  ClientItemSchema,
  BlogPostSchema,
  AcademicItemSchema,
  ExecutiveItemSchema,
  MilitaryItemSchema,
  OrganizationItemSchema,
  PatentItemSchema,
  CourseItemSchema,
  TestScoreItemSchema,
  PersonalSchema,
  CustomSectionSchema,
} from '@/lib/schema';

// ─── Core Types ──────────────────────────────────────────────────────────────

export type HyprfolioConfig = z.infer<typeof HyprfolioConfigSchema>;
export type WindowType = z.infer<typeof WindowTypeEnum>;
export type TileContent = z.infer<typeof TileContentEnum>;
export type PaletteId = z.infer<typeof PaletteIdEnum>;

// ─── Section Types ───────────────────────────────────────────────────────────

export type Site = z.infer<typeof SiteSchema>;
export type SEO = z.infer<typeof SEOSchema>;
export type Analytics = z.infer<typeof AnalyticsSchema>;
export type Profile = z.infer<typeof ProfileSchema>;
export type SocialLink = z.infer<typeof SocialLinkSchema>;
export type Contact = z.infer<typeof ContactSchema>;
export type About = z.infer<typeof AboutSchema>;
export type Palette = z.infer<typeof PaletteSchema>;
export type Wallpaper = z.infer<typeof WallpaperSchema>;
export type Waybar = z.infer<typeof WaybarSchema>;
export type Layout = z.infer<typeof LayoutSchema>;
export type Animations = z.infer<typeof AnimationsSchema>;
export type TileDefinition = z.infer<typeof TileDefinitionSchema>;

// ─── CV Types ────────────────────────────────────────────────────────────────

export type ExperienceItem = z.infer<typeof ExperienceItemSchema>;
export type EducationItem = z.infer<typeof EducationItemSchema>;
export type SkillCategory = z.infer<typeof SkillCategorySchema>;
export type SkillItem = z.infer<typeof SkillItemSchema>;
export type ProjectItem = z.infer<typeof ProjectItemSchema>;
export type ProjectsGithub = z.infer<typeof ProjectsGithubSchema>;
export type Projects = z.infer<typeof ProjectsSchema>;
export type CertificationItem = z.infer<typeof CertificationItemSchema>;
export type AwardItem = z.infer<typeof AwardItemSchema>;
export type PublicationItem = z.infer<typeof PublicationItemSchema>;
export type SpeakingItem = z.infer<typeof SpeakingItemSchema>;
export type VolunteerItem = z.infer<typeof VolunteerItemSchema>;
export type LanguageItem = z.infer<typeof LanguageItemSchema>;
export type InterestItem = z.infer<typeof InterestItemSchema>;
export type ReferenceItem = z.infer<typeof ReferenceItemSchema>;

// ─── Portfolio/Freelance Types ───────────────────────────────────────────────

export type TestimonialItem = z.infer<typeof TestimonialItemSchema>;
export type ServiceItem = z.infer<typeof ServiceItemSchema>;
export type ClientItem = z.infer<typeof ClientItemSchema>;
export type BlogPost = z.infer<typeof BlogPostSchema>;

// ─── Specialized Types ───────────────────────────────────────────────────────

export type AcademicItem = z.infer<typeof AcademicItemSchema>;
export type ExecutiveItem = z.infer<typeof ExecutiveItemSchema>;
export type MilitaryItem = z.infer<typeof MilitaryItemSchema>;

// ─── Additional Types ────────────────────────────────────────────────────────

export type OrganizationItem = z.infer<typeof OrganizationItemSchema>;
export type PatentItem = z.infer<typeof PatentItemSchema>;
export type CourseItem = z.infer<typeof CourseItemSchema>;
export type TestScoreItem = z.infer<typeof TestScoreItemSchema>;
export type Personal = z.infer<typeof PersonalSchema>;
export type CustomSection = z.infer<typeof CustomSectionSchema>;
