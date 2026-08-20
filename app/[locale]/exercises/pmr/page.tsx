import type { Metadata } from "next";
import {useTranslations} from "next-intl";
import { getTranslations } from "next-intl/server";
import ExercisesHeader from "@/components/exercises/header";
import PmrExercise from "@/components/exercises/pmr";
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
    path: "/exercises/pmr",
    title: tMethod("pmr"),
    description: tSeo("pmrDescription"),
  });
}

export default function Pmr() {
  const t = useTranslations('Common')
  const tMethod = useTranslations('Method')
  const tApp = useTranslations('App')
  const tMenu = useTranslations('Menu')

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: tApp('title'), path: "/" },
          { name: tMenu('exercises'), path: "/exercises" },
          { name: tMethod('pmr'), path: "/exercises/pmr" },
        ]}
      />
      <div className="container mx-auto px-5 sm:px-8 lg:px-10 py-8">
        <ExercisesHeader title={ tMethod('pmr') }>
          <p className="text-base text-tx-primary whitespace-pre-line">
            { tMethod('pmrReadMore') }
          </p>
          <p className="text-sm text-gray-500 mt-4">
            <a href={"https://pmc.ncbi.nlm.nih.gov/articles/PMC8272667/"}
               target="_blank"
            >
              {t('source')}: Loren Toussaint, Quang Anh Nguyen, Claire Roettger, Kiara Dixon, Martin Offenbächer, Niko Kohls, Jameson Hirsch, Fuschia Sirois
            </a>
          </p>
        </ExercisesHeader>
        <PmrExercise />
        <p className="text-sm text-gray-500 mt-4">
          <a href={"https://www.health.harvard.edu/staying-healthy/try-this-progressive-muscle-relaxation-for-sleep"} target={"_blank"} rel={"noreferrer noopener nofollow"}>
            {tMethod('source')}: Harvard Health Publishing
          </a>
        </p>
      </div>
    </>
  );
}
