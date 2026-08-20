import type { Metadata } from "next";
import {useTranslations} from "next-intl";
import { getTranslations } from "next-intl/server";
import ExercisesHeader from "@/components/exercises/header";
import InteractiveSelector from "@/components/exercises/interactive/selector";
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
    path: "/exercises/interactive",
    title: tMethod("interactive"),
    description: tSeo("interactiveDescription"),
  });
}

export default function Interactive() {
  const t = useTranslations('Method')
  const tApp = useTranslations('App')
  const tMenu = useTranslations('Menu')

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: tApp('title'), path: "/" },
          { name: tMenu('exercises'), path: "/exercises" },
          { name: t('interactive'), path: "/exercises/interactive" },
        ]}
      />
      <div className="container mx-auto px-5 sm:px-8 lg:px-10 py-8">
        <ExercisesHeader title={ t('interactive') }>
          <p className="text-base text-tx-primary whitespace-pre-line">
            { t('interactiveReadMore') }
          </p>
          <p className="text-sm text-gray-500 mt-4">
            <a href={"https://www.skyinsideuk.com/blogs/the-mental-health-benefits-of-interactive-games"}
               target="_blank"
            >
              {t('source')}: Sky Inside UK
            </a>
          </p>
        </ExercisesHeader>
        <InteractiveSelector />
      </div>
    </>
  );
}
