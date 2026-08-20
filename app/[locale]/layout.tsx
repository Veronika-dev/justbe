import type {Metadata, Viewport} from "next";
import "@/globals.css";
import {manrope} from "@/ui/fonts";
import { getTranslations } from 'next-intl/server';
import {NextIntlClientProvider} from "next-intl";
import { CheckinStoreProvider } from '@/providers/checkin-store-provider'
import React from "react";
import Sidebar from "@/components/main/sidebar";
import JsonLd from "@/components/seo/json-ld";
import {
  createOrganizationJsonLd,
  createWebSiteJsonLd,
  getSupportedLocale,
  siteUrl,
} from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'App' });

  return {
    metadataBase: new URL(siteUrl),
    applicationName: t('title'),
    title: {
      template: `%s | ${t('title')}`,
      default: t('title'),
    },
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      siteName: t('title'),
      type: "website",
    },
    twitter: {
      card: "summary",
      title: t('title'),
      description: t('description'),
    },
    appleWebApp: {
      title: t('title'),
    }
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  colorScheme: "dark",
  themeColor: "#060b10",
};

export default async function RootLayout({
                                     params, children,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'App' });
  const supportedLocale = getSupportedLocale(locale);
  const websiteJsonLd = createWebSiteJsonLd({
    locale: supportedLocale,
    name: t('title'),
    description: t('description'),
  });
  const organizationJsonLd = createOrganizationJsonLd({
    name: t('title'),
    alternateName: t('capy'),
  });

  return (
    <html
      lang={locale}
      className={`${manrope.variable} h-full antialiased theme-dark`}
    >
      <body className="min-h-full flex align-items-center ps-0 lg:ps-70">
        <JsonLd data={websiteJsonLd} />
        <JsonLd data={organizationJsonLd} />
        <CheckinStoreProvider>
          <NextIntlClientProvider>
            <Sidebar />
            {children}
          </NextIntlClientProvider>
        </CheckinStoreProvider>
      </body>
    </html>
  );
}
