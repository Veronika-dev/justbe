import type { Metadata } from "next";
import {useTranslations} from "next-intl";
import { getTranslations } from "next-intl/server";
import ExercisesHeader from "@/components/exercises/header";
import CreativeCards from "@/components/exercises/creative/cards";
import {Suspense} from "react";
import { createPageMetadata } from "@/lib/seo";
import BreadcrumbJsonLd from "@/components/seo/breadcrumb-json-ld";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const tMethod = await getTranslations({ locale, namespace: "Method" });
  const tSeo = await getTranslations({ locale, namespace: "Seo" });

  return createPageMetadata({
    locale,
    path: "/exercises/creative",
    title: tMethod("creative"),
    description: tSeo("creativeDescription"),
  });
}

export default function Creative() {
  const t = useTranslations('Method')
  const tApp = useTranslations('App')
  const tMenu = useTranslations('Menu')

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: tApp('title'), path: "/" },
          { name: tMenu('exercises'), path: "/exercises" },
          { name: t('creative'), path: "/exercises/creative" },
        ]}
      />
      <div className="container mx-auto px-5 sm:px-8 lg:px-10 py-8">
        <ExercisesHeader title={ t('creative') }>
          <p className="text-base text-tx-primary whitespace-pre-line">
            { t('creativeReadMore') }
          </p>
          <p className="text-sm text-gray-500 mt-4">
            <a href={"https://www.northernhealthcare.org.uk/news-resources/how-working-with-your-hands-can-ease-anxiety/"}
               target="_blank"
            >
              {t('source')}: Northern Healthcare
            </a>
          </p>
        </ExercisesHeader>
        <Suspense fallback={<div/>}>
          <CreativeCards />
        </Suspense>
      </div>
    </>
  );
}
