import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.PUBLIC_URL || 'http://localhost:3100'
  const routes = [
    '',
    '/about',
    '/sustainability',
    '/quality-and-technology',
    '/tiles',
    '/collections',
    '/slim-tiles',
    '/heatproof-tiles',
    '/spaces',
    '/showrooms',
    '/downloads',
    '/learn',
    '/initiatives',
    '/fitters',
    '/professionals',
    '/become-a-dealer',
    '/news',
    '/faq',
    '/contact',
    '/visualizer',
    '/privacy',
    '/terms',
  ]

  const items: MetadataRoute.Sitemap = []

  routes.forEach((route) => {
    // English (default)
    items.push({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: route === '' ? 'daily' : 'weekly',
      priority: route === '' ? 1.0 : route.startsWith('/tiles') ? 0.9 : 0.7,
      alternates: {
        languages: {
          en: `${baseUrl}${route}`,
          bn: `${baseUrl}/bn${route}`,
        },
      },
    })

    // Bengali
    items.push({
      url: `${baseUrl}/bn${route}`,
      lastModified: new Date(),
      changeFrequency: route === '' ? 'daily' : 'weekly',
      priority: route === '' ? 0.9 : 0.6,
      alternates: {
        languages: {
          en: `${baseUrl}${route}`,
          bn: `${baseUrl}/bn${route}`,
        },
      },
    })
  })

  return items
}
