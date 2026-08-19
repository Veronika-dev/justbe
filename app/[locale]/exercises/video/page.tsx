import type { Metadata } from "next";
import {useTranslations} from "next-intl";
import { getTranslations } from "next-intl/server";
import ExercisesHeader from "@/components/exercises/header";
import ExercisesVideo from "@/components/exercises/video";
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
    path: "/exercises/video",
    title: tMethod("video"),
    description: tSeo("videoDescription"),
  });
}

export default function Video() {
  const t = useTranslations('Method')
  const tCommon = useTranslations('Common')
  const tApp = useTranslations('App')
  const tMenu = useTranslations('Menu')

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: tApp('title'), path: "/" },
          { name: tMenu('exercises'), path: "/exercises" },
          { name: t('video'), path: "/exercises/video" },
        ]}
      />
      <div className="container mx-auto px-4 py-8">
        <ExercisesHeader title={ t('video') }>
          <>
            <p className="text-base text-tx-primary whitespace-pre-line">
              { t('videoReadMore') }
            </p>
            <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC9226437" target="_blank" className="block text-sm text-gray-500 mt-4">
              { t('studySource') }: Benz, Gaertner, Meier, Unternaehrer, Scharndke, Jupe, Wenzel, Bentele, Dimitroff, Denk and Pruessner
            </a>
          </>
        </ExercisesHeader>
        <ExercisesVideo />
        <a href="https://edinburghrecords.com" target="_blank" className="block text-sm text-gray-500 mt-4">
          { tCommon('source') }: Edinburgh Records
        </a>
      </div>
    </>
  );
}
