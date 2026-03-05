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
  const { profile, about, links } = config;

  const jsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
  };

  if (profile.headline) jsonLd.jobTitle = profile.headline;
  if (about.bio) jsonLd.description = about.bio;
  if (profile.photo) jsonLd.image = profile.photo;
  if (config.site.url) jsonLd.url = config.site.url;
  if (profile.location) {
    jsonLd.address = {
      '@type': 'PostalAddress',
      addressLocality: profile.location,
    };
  }

  if (profile.email) jsonLd.email = profile.email;
  if (profile.phone) jsonLd.telephone = profile.phone;

  if (links.length > 0) {
    jsonLd.sameAs = links.map((s) => s.url);
  }

  return jsonLd;
}
