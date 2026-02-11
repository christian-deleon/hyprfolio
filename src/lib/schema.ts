import { z } from 'zod';

// ─── Enums ───────────────────────────────────────────────────────────────────

export const WindowTypeEnum = z.enum([
  'terminal',
  'browser',
  'editor',
  'file-manager',
  'system-monitor',
  'pdf-viewer',
  'image-viewer',
  'markdown-viewer',
  'blank',
]);

export const TileContentEnum = z.enum([
  'about',
  'experience',
  'education',
  'skills',
  'projects',
  'certifications',
  'contact',
  'custom',
]);

export const PaletteIdEnum = z.enum([
  'catppuccin-mocha',
  'catppuccin-latte',
  'tokyo-night',
  'tokyo-night-light',
  'gruvbox-dark',
  'gruvbox-light',
  'nord',
  'nord-light',
  'dracula',
  'rose-pine',
  'rose-pine-dawn',
]);

// ─── Helpers ─────────────────────────────────────────────────────────────────

const urlString = z.string().url();
const optionalUrl = z.string().url().optional();
const optionalString = z.string().optional();
const isoDateString = z
  .string()
  .regex(
    /^\d{4}(-\d{2})?(-\d{2})?$/,
    'Must be ISO date: YYYY, YYYY-MM, or YYYY-MM-DD',
  );

// ─── Site & SEO ──────────────────────────────────────────────────────────────

export const SiteSchema = z.object({
  title: z.string().min(1, 'Site title is required'),
  description: z.string().default(''),
  url: optionalUrl,
  language: z.string().default('en'),
});

export const SEOSchema = z.object({
  ogImage: optionalUrl,
  twitterHandle: optionalString,
  canonicalUrl: optionalUrl,
  noIndex: z.boolean().default(false),
});

export const AnalyticsSchema = z.object({
  googleId: optionalString,
  plausibleDomain: optionalString,
});

// ─── Profile & Identity ─────────────────────────────────────────────────────

export const ProfileSchema = z.object({
  name: z.string().min(1, 'Profile name is required'),
  username: optionalString,
  headline: z.string().default(''),
  summary: z.string().default(''),
  photo: optionalString,
  location: optionalString,
  phone: optionalString,
  email: optionalString,
  website: optionalUrl,
});

export const SocialLinkSchema = z.object({
  network: z.string(),
  url: urlString,
  username: optionalString,
});

export const ContactSchema = z.object({
  email: optionalString,
  phone: optionalString,
  location: optionalString,
  availability: optionalString,
  preferredContact: optionalString,
  message: optionalString,
});

export const AboutSchema = z.object({
  ascii: optionalString,
  bio: z.string().default(''),
  funFacts: z.array(z.string()).default([]),
  systemInfo: z.record(z.string(), z.string()).default({}),
});

// ─── Visual Settings ────────────────────────────────────────────────────────

export const PaletteSchema = z.object({
  default: PaletteIdEnum.default('catppuccin-mocha'),
  defaultLight: PaletteIdEnum.default('catppuccin-latte'),
  available: z
    .array(PaletteIdEnum)
    .default([
      'catppuccin-mocha',
      'catppuccin-latte',
      'tokyo-night',
      'tokyo-night-light',
      'gruvbox-dark',
      'gruvbox-light',
      'nord',
      'nord-light',
      'dracula',
      'rose-pine',
      'rose-pine-dawn',
    ]),
  respectSystem: z.boolean().default(true),
});

export const WallpaperSchema = z.object({
  image: optionalString,
  opacity: z.number().min(0).max(1).default(1),
  blur: z.number().min(0).default(0),
  size: z.enum(['cover', 'contain', 'auto']).default('cover'),
  position: z.string().default('center'),
});

export const WaybarSchema = z.object({
  show: z.boolean().default(true),
  title: optionalString,
  workspaces: z.number().int().min(1).max(10).default(5),
  activeWorkspace: z.number().int().min(1).default(1),
  showClock: z.boolean().default(true),
  showPaletteSwitcher: z.boolean().default(true),
  trayIcons: z.array(z.string()).default([]),
  height: z.number().default(36),
  fontSize: z.number().default(13),
});

export const LayoutSchema = z.object({
  maxWidth: z.number().default(1400),
  innerGap: z.number().default(5),
  outerGap: z.number().default(20),
  windowOpacity: z.number().min(0).max(1).default(0.85),
  windowBlur: z.number().min(0).default(10),
  borderRadius: z.number().min(0).default(10),
  borderWidth: z.number().min(0).default(1),
  inactiveOpacity: z.number().min(0).max(1).default(0.85),
  noiseOpacity: z.number().min(0).max(1).default(0.03),
  terminalFontSize: z.number().default(13),
  uiFontSize: z.number().default(14),
});

export const AnimationsSchema = z.object({
  enabled: z.boolean().default(true),
  entrance: z
    .enum(['popin', 'slide-up', 'slide-left', 'fade', 'none'])
    .default('popin'),
  duration: z.number().default(410),
  stagger: z.number().default(80),
  hoverScale: z.number().default(1.01),
});

// ─── Tile Definition ────────────────────────────────────────────────────────

export const TileDefinitionSchema = z.object({
  content: TileContentEnum,
  windowType: WindowTypeEnum.default('terminal'),
  colSpan: z.number().int().min(1).max(12).default(6),
  rowSpan: z.number().int().min(1).max(6).default(1),
  order: z.number().int().optional(),
  terminalTitle: optionalString,
  browserUrl: optionalString,
  editorFilename: optionalString,
  title: optionalString,
  customContent: optionalString,
  customHtml: optionalString,
});

// ─── Experience ─────────────────────────────────────────────────────────────

export const ExperienceItemSchema = z.object({
  company: z.string(),
  position: z.string(),
  url: optionalUrl,
  startDate: isoDateString,
  endDate: isoDateString.optional(),
  current: z.boolean().default(false),
  summary: z.string().default(''),
  highlights: z.array(z.string()).default([]),
  location: optionalString,
});

// ─── Education ──────────────────────────────────────────────────────────────

export const EducationItemSchema = z.object({
  institution: z.string(),
  area: z.string(),
  studyType: optionalString,
  startDate: isoDateString,
  endDate: isoDateString.optional(),
  gpa: optionalString,
  courses: z.array(z.string()).default([]),
  honors: z.array(z.string()).default([]),
  url: optionalUrl,
});

// ─── Skills ─────────────────────────────────────────────────────────────────

export const SkillTierEnum = z.enum([
  'familiar',
  'proficient',
  'advanced',
  'expert',
]);

export const SkillItemSchema = z.object({
  name: z.string(),
  tier: SkillTierEnum.default('advanced'),
  color: optionalString,
});

export const SkillCategorySchema = z.object({
  category: z.string(),
  skills: z.array(SkillItemSchema),
});

// ─── Projects ───────────────────────────────────────────────────────────────

export const ProjectItemSchema = z.object({
  name: z.string(),
  description: z.string().default(''),
  url: optionalUrl,
  image: optionalString,
  technologies: z.array(z.string()).default([]),
  highlights: z.array(z.string()).default([]),
  startDate: isoDateString.optional(),
  endDate: isoDateString.optional(),
  featured: z.boolean().default(false),
});

export const ProjectsGithubSchema = z.object({
  username: z.string().min(1, 'GitHub username is required when github is configured'),
});

export const ProjectsSchema = z.object({
  github: ProjectsGithubSchema.optional(),
  items: z.array(ProjectItemSchema).default([]),
});

// ─── Certifications ─────────────────────────────────────────────────────────

export const CertificationItemSchema = z.object({
  name: z.string(),
  issuer: z.string(),
  date: isoDateString.optional(),
  expiryDate: isoDateString.optional(),
  url: optionalUrl,
  id: optionalString,
});

// ─── Awards ─────────────────────────────────────────────────────────────────

export const AwardItemSchema = z.object({
  title: z.string(),
  awarder: z.string(),
  date: isoDateString.optional(),
  summary: z.string().default(''),
});

// ─── Publications ───────────────────────────────────────────────────────────

export const PublicationItemSchema = z.object({
  name: z.string(),
  publisher: z.string(),
  releaseDate: isoDateString.optional(),
  url: optionalUrl,
  summary: z.string().default(''),
});

// ─── Speaking ───────────────────────────────────────────────────────────────

export const SpeakingItemSchema = z.object({
  title: z.string(),
  event: z.string(),
  date: isoDateString.optional(),
  url: optionalUrl,
  summary: z.string().default(''),
});

// ─── Volunteer ──────────────────────────────────────────────────────────────

export const VolunteerItemSchema = z.object({
  organization: z.string(),
  position: z.string(),
  url: optionalUrl,
  startDate: isoDateString.optional(),
  endDate: isoDateString.optional(),
  summary: z.string().default(''),
  highlights: z.array(z.string()).default([]),
});

// ─── Languages ──────────────────────────────────────────────────────────────

export const LanguageItemSchema = z.object({
  language: z.string(),
  fluency: z.string(),
});

// ─── Interests ──────────────────────────────────────────────────────────────

export const InterestItemSchema = z.object({
  name: z.string(),
  keywords: z.array(z.string()).default([]),
});

// ─── References ─────────────────────────────────────────────────────────────

export const ReferenceItemSchema = z.object({
  name: z.string(),
  reference: z.string(),
  position: optionalString,
  company: optionalString,
});

// ─── Testimonials ───────────────────────────────────────────────────────────

export const TestimonialItemSchema = z.object({
  name: z.string(),
  role: optionalString,
  company: optionalString,
  quote: z.string(),
  photo: optionalString,
});

// ─── Services ───────────────────────────────────────────────────────────────

export const ServiceItemSchema = z.object({
  name: z.string(),
  description: z.string().default(''),
  icon: optionalString,
});

// ─── Clients ────────────────────────────────────────────────────────────────

export const ClientItemSchema = z.object({
  name: z.string(),
  logo: optionalString,
  url: optionalUrl,
});

// ─── Blog ───────────────────────────────────────────────────────────────────

export const BlogPostSchema = z.object({
  title: z.string(),
  slug: z.string(),
  date: isoDateString,
  summary: z.string().default(''),
  content: z.string().default(''),
  tags: z.array(z.string()).default([]),
  url: optionalUrl,
});

// ─── Academic ───────────────────────────────────────────────────────────────

export const AcademicItemSchema = z.object({
  title: z.string(),
  authors: z.array(z.string()).default([]),
  venue: optionalString,
  year: z.number().int().optional(),
  url: optionalUrl,
  doi: optionalString,
  abstract: z.string().default(''),
});

// ─── Executive ──────────────────────────────────────────────────────────────

export const ExecutiveItemSchema = z.object({
  title: z.string(),
  organization: z.string(),
  startDate: isoDateString.optional(),
  endDate: isoDateString.optional(),
  highlights: z.array(z.string()).default([]),
});

// ─── Military ───────────────────────────────────────────────────────────────

export const MilitaryItemSchema = z.object({
  branch: z.string(),
  rank: z.string(),
  startDate: isoDateString.optional(),
  endDate: isoDateString.optional(),
  decorations: z.array(z.string()).default([]),
  summary: z.string().default(''),
});

// ─── Organizations ──────────────────────────────────────────────────────────

export const OrganizationItemSchema = z.object({
  name: z.string(),
  role: optionalString,
  startDate: isoDateString.optional(),
  endDate: isoDateString.optional(),
  url: optionalUrl,
});

// ─── Patents ────────────────────────────────────────────────────────────────

export const PatentItemSchema = z.object({
  title: z.string(),
  number: optionalString,
  date: isoDateString.optional(),
  url: optionalUrl,
  summary: z.string().default(''),
});

// ─── Courses ────────────────────────────────────────────────────────────────

export const CourseItemSchema = z.object({
  name: z.string(),
  institution: optionalString,
  date: isoDateString.optional(),
  url: optionalUrl,
});

// ─── Test Scores ────────────────────────────────────────────────────────────

export const TestScoreItemSchema = z.object({
  name: z.string(),
  score: z.string(),
  date: isoDateString.optional(),
  description: z.string().default(''),
});

// ─── Personal ───────────────────────────────────────────────────────────────

export const PersonalSchema = z.object({
  dateOfBirth: isoDateString.optional(),
  nationality: optionalString,
  maritalStatus: optionalString,
});

// ─── Custom Sections ────────────────────────────────────────────────────────

export const CustomSectionSchema = z.object({
  title: z.string(),
  icon: optionalString,
  items: z.array(
    z.object({
      label: z.string(),
      value: z.string(),
      url: optionalUrl,
    }),
  ),
});

// ─── Root Config ────────────────────────────────────────────────────────────

export const HyprfolioConfigSchema = z.object({
  // Core (required)
  site: SiteSchema,
  profile: ProfileSchema,
  tiles: z.array(TileDefinitionSchema).min(1, 'At least one tile is required'),

  // Identity
  contact: ContactSchema.default({}),
  social: z.array(SocialLinkSchema).default([]),
  about: AboutSchema.default({}),

  // Visual
  palette: PaletteSchema.default({}),
  wallpaper: WallpaperSchema.default({}),
  waybar: WaybarSchema.default({}),
  layout: LayoutSchema.default({}),
  animations: AnimationsSchema.default({}),

  // SEO & Analytics
  seo: SEOSchema.default({}),
  analytics: AnalyticsSchema.default({}),

  // Core CV
  experience: z.array(ExperienceItemSchema).default([]),
  education: z.array(EducationItemSchema).default([]),
  skills: z.array(SkillCategorySchema).default([]),
  projects: ProjectsSchema.default({}),
  certifications: z.array(CertificationItemSchema).default([]),

  // Extended CV
  awards: z.array(AwardItemSchema).default([]),
  publications: z.array(PublicationItemSchema).default([]),
  speaking: z.array(SpeakingItemSchema).default([]),
  volunteer: z.array(VolunteerItemSchema).default([]),
  languages: z.array(LanguageItemSchema).default([]),
  interests: z.array(InterestItemSchema).default([]),
  references: z.array(ReferenceItemSchema).default([]),

  // Portfolio/Freelance
  testimonials: z.array(TestimonialItemSchema).default([]),
  services: z.array(ServiceItemSchema).default([]),
  clients: z.array(ClientItemSchema).default([]),
  blog: z.array(BlogPostSchema).default([]),

  // Specialized
  academic: z.array(AcademicItemSchema).default([]),
  executive: z.array(ExecutiveItemSchema).default([]),
  military: z.array(MilitaryItemSchema).default([]),

  // Additional
  organizations: z.array(OrganizationItemSchema).default([]),
  patents: z.array(PatentItemSchema).default([]),
  courses: z.array(CourseItemSchema).default([]),
  testScores: z.array(TestScoreItemSchema).default([]),
  personal: PersonalSchema.optional(),
  custom: z.array(CustomSectionSchema).default([]),
});
