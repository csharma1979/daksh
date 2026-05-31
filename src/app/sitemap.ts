import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://dakshinteriors.in';

  const routes = [
    '',
    '/about',
    '/services',
    '/projects',
    '/contact',
    '/careers',
    '/vastu-tips',
    '/pooja-room',
    '/false-ceiling',
    '/wardrobes',
    '/storage-units',
    '/design-ideas/trending-designs',
    '/design-ideas/modular-kitchen',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : (route === '/contact' || route === '/services') ? 0.9 : 0.8,
  }));

  return routes;
}
