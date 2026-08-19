import type { Metadata } from "next";

export const supportedLocales = ["ru", "en"] as const;
export const defaultLocale = "ru";

export type SupportedLocale = (typeof supportedLocales)[number];

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
).replace(/\/$/, "");

export const localizedPath = (
  locale: SupportedLocale,
  path: string = "/",
) => {
  const normalizedPath = path === "/" ? "" : path;

  if (locale === defaultLocale) {
    return normalizedPath || "/";
  }

  return `/${locale}${normalizedPath}`;
};

export const absoluteUrl = (locale: SupportedLocale, path: string = "/") =>
  new URL(localizedPath(locale, path), siteUrl).toString();

export const siteImageUrl = new URL("/img-preview.jpg", siteUrl).toString();
export const contactEmail =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@example.com";

const openGraphLocales: Record<SupportedLocale, string> = {
  ru: "ru_RU",
  en: "en_US",
};

export const getSupportedLocale = (locale: string): SupportedLocale =>
  supportedLocales.includes(locale as SupportedLocale)
    ? (locale as SupportedLocale)
    : defaultLocale;

export const getAlternates = (locale: SupportedLocale, path: string = "/") => ({
  canonical: absoluteUrl(locale, path),
  languages: {
    ...supportedLocales.reduce(
      (accumulator, item) => ({
        ...accumulator,
        [item]: absoluteUrl(item, path),
      }),
      {} as Record<SupportedLocale, string>,
    ),
    "x-default": absoluteUrl(defaultLocale, path),
  },
});

export const createPageMetadata = ({
  locale,
  path,
  title,
  description,
  absoluteTitle = false,
}: {
  locale: string;
  path?: string;
  title: string;
  description: string;
  absoluteTitle?: boolean;
}): Metadata => {
  const supportedLocale = getSupportedLocale(locale);
  const metadataTitle = absoluteTitle ? { absolute: title } : title;

  return {
    title: metadataTitle,
    description,
    alternates: getAlternates(supportedLocale, path),
    openGraph: {
      title,
      description,
      url: absoluteUrl(supportedLocale, path),
      locale: openGraphLocales[supportedLocale],
      alternateLocale: supportedLocales
        .filter((item) => item !== supportedLocale)
        .map((item) => openGraphLocales[item]),
      type: "website",
      images: [
        {
          url: siteImageUrl,
          width: 512,
          height: 512,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary",
      title,
      description,
      images: [siteImageUrl],
    },
  };
};

export const createWebSiteJsonLd = ({
  locale,
  name,
  description,
}: {
  locale: SupportedLocale;
  name: string;
  description: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  url: absoluteUrl(defaultLocale),
  name,
  description,
  inLanguage: locale,
});

export const createOrganizationJsonLd = ({
  name,
  alternateName,
}: {
  name: string;
  alternateName?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteUrl}/#organization`,
  name,
  alternateName,
  url: absoluteUrl(defaultLocale),
  logo: siteImageUrl,
});

export const createBreadcrumbJsonLd = ({
  locale,
  items,
}: {
  locale: SupportedLocale;
  items: Array<{ name: string; path: string }>;
}) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: absoluteUrl(locale, item.path),
  })),
});

export const privatePageMetadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export const publicSeoRoutes = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/about", priority: 0.7, changeFrequency: "monthly" },
  { path: "/contacts", priority: 0.5, changeFrequency: "yearly" },
  { path: "/exercises", priority: 0.9, changeFrequency: "weekly" },
  { path: "/exercises/grounding", priority: 0.8, changeFrequency: "monthly" },
  { path: "/exercises/breathing", priority: 0.8, changeFrequency: "monthly" },
  { path: "/exercises/video", priority: 0.7, changeFrequency: "monthly" },
  { path: "/exercises/interactive", priority: 0.7, changeFrequency: "monthly" },
  { path: "/exercises/creative", priority: 0.7, changeFrequency: "monthly" },
  { path: "/exercises/pmr", priority: 0.7, changeFrequency: "monthly" },
  { path: "/privacy", priority: 0.4, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.4, changeFrequency: "yearly" },
] as const;

export const privateSeoPaths = ["/diary", "/settings", "/tests"] as const;
