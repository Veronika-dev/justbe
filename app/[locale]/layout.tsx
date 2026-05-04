import type { Metadata } from "next";
import "@/globals.css";
import {manrope} from "@/ui/fonts";
import { getTranslations } from 'next-intl/server';
import {NextIntlClientProvider} from "next-intl";
import { CheckinStoreProvider } from '@/providers/checkin-store-provider'
import React from "react";
import Sidebar from "@/components/main/sidebar";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'App' });

  return {
    title: {
      template: `%s | ${t('title')}`,
      default: t('title'),
    },
    description: "",
  };
}

export default async function RootLayout({
                                     params, children,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params
  return (
    <html
      lang={locale}
      className={`${manrope.variable} h-full antialiased theme-dark`}
    >
      <body className="min-h-full flex align-items-center ps-40">
        <CheckinStoreProvider>
          <Sidebar />
          <NextIntlClientProvider>{children}</NextIntlClientProvider>
        </CheckinStoreProvider>
      </body>
    </html>
  );
}
