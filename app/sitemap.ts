import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://elysene.engineering';
  const locales = ['fr', 'en'];
  const lastModified = new Date();

  // Static pages
  const staticPages = [
    '',
    '/blog',
    '/legal',
    '/privacy',
  ];

  // Project pages
  const projectSlugs = [
    'monitoring-big-data',
    'cloud-data-migration',
    'saas-esg-genai',
    'bi-governance-security',
  ];

  // Blog article pages
  const articleSlugs = [
    'big-data-rgpd',
  ];

  const routes: MetadataRoute.Sitemap = [];

  // Add static pages for each locale
  locales.forEach(locale => {
    staticPages.forEach(page => {
      routes.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified,
        changeFrequency: page === '' ? 'weekly' : 'monthly',
        priority: page === '' ? 1 : 0.8,
      });
    });

    // Add project pages
    projectSlugs.forEach(slug => {
      routes.push({
        url: `${baseUrl}/${locale}/projects/${slug}`,
        lastModified,
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    });

    // Add blog article pages
    articleSlugs.forEach(slug => {
      routes.push({
        url: `${baseUrl}/${locale}/blog/${slug}`,
        lastModified,
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    });
  });

  return routes;
}
