import type { MetadataRoute } from "next";
import {
  absoluteUrl,
  publicSeoRoutes,
  supportedLocales,
  type SupportedLocale,
} from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return publicSeoRoutes.flatMap((route) =>
    supportedLocales.map((locale) => ({
      url: absoluteUrl(locale, route.path),
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: {
        languages: {
          ...supportedLocales.reduce(
            (accumulator, item) => ({
              ...accumulator,
              [item]: absoluteUrl(item, route.path),
            }),
            {} as Record<SupportedLocale, string>,
          ),
          "x-default": absoluteUrl("ru", route.path),
        },
      },
    })),
  );
}
