import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: process.env.NEXT_PUBLIC_BASE_URL,
      lastModified: new Date(),
      priority: 1,
      changeFrequency: 'yearly',
      alternates: {
        languages: {
          en: `${process.env.NEXT_PUBLIC_BASE_URL}/en`,
          fr: `${process.env.NEXT_PUBLIC_BASE_URL}/fr`,
        },
      },
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/profile`,
      lastModified: new Date(),
      priority: 0.9,
      changeFrequency: 'monthly',
      alternates: {
        languages: {
          en: `${process.env.NEXT_PUBLIC_BASE_URL}/en/profile`,
          fr: `${process.env.NEXT_PUBLIC_BASE_URL}/fr/profile`,
        },
      },
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/assets`,
      lastModified: new Date(),
      priority: 0.1,
      changeFrequency: 'yearly',
      alternates: {
        languages: {
          en: `${process.env.NEXT_PUBLIC_BASE_URL}/en/assets`,
          fr: `${process.env.NEXT_PUBLIC_BASE_URL}/fr/assets`,
        },
      },
    },
  ];
}
