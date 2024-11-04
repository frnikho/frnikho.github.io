import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: 'https://nikho.dev',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
            images: ["https://www.nikho.dev/android-chrome-192x192.png"]
        },
    ]
}