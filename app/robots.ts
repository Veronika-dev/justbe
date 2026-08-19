import type { MetadataRoute } from "next";
import {
  localizedPath,
  privateSeoPaths,
  siteUrl,
  supportedLocales,
} from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: supportedLocales.flatMap((locale) =>
        privateSeoPaths.map((path) => localizedPath(locale, path)),
      ),
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
