import type { HyprfolioConfig } from '@/types/config';

export interface MetaTag {
  name?: string;
  property?: string;
  content: string;
}

export function buildMetaTags(config: HyprfolioConfig): MetaTag[] {
  const { site, profile, seo } = config;
  const tags: MetaTag[] = [];

  tags.push({
    name: 'description',
    content: site.description || profile.headline,
  });

  if (seo.noIndex) {
    tags.push({ name: 'robots', content: 'noindex, nofollow' });
  }

  // Open Graph
  tags.push({ property: 'og:title', content: site.title });
  tags.push({
    property: 'og:description',
    content: site.description || profile.headline,
  });
  tags.push({ property: 'og:type', content: 'website' });

  if (site.url) {
    tags.push({ property: 'og:url', content: site.url });
  }

  if (seo.ogImage) {
    tags.push({ property: 'og:image', content: seo.ogImage });
  }

  // Twitter Card
  tags.push({ name: 'twitter:card', content: 'summary_large_image' });
  tags.push({ name: 'twitter:title', content: site.title });
  tags.push({
    name: 'twitter:description',
    content: site.description || profile.headline,
  });

  if (seo.twitterHandle) {
    tags.push({ name: 'twitter:site', content: seo.twitterHandle });
    tags.push({ name: 'twitter:creator', content: seo.twitterHandle });
  }

  if (seo.ogImage) {
    tags.push({ name: 'twitter:image', content: seo.ogImage });
  }

  return tags;
}

export function buildPersonJsonLd(
  config: HyprfolioConfig,
): Record<string, unknown> {
  const { profile, social, contact } = config;

  const jsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
  };

  if (profile.headline) jsonLd.jobTitle = profile.headline;
  if (profile.summary) jsonLd.description = profile.summary;
  if (profile.photo) jsonLd.image = profile.photo;
  if (profile.website) jsonLd.url = profile.website;
  if (profile.location) {
    jsonLd.address = {
      '@type': 'PostalAddress',
      addressLocality: profile.location,
    };
  }

  if (contact.email || profile.email) {
    jsonLd.email = contact.email || profile.email;
  }

  if (contact.phone || profile.phone) {
    jsonLd.telephone = contact.phone || profile.phone;
  }

  if (social.length > 0) {
    jsonLd.sameAs = social.map((s) => s.url);
  }

  return jsonLd;
}
