import { MetadataRoute } from 'next';
import { domainUrl } from '../whoami/links';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/', '/private/', '/dashboard/'],
    },
    sitemap: `${domainUrl}/sitemap.xml`,
  };
}
