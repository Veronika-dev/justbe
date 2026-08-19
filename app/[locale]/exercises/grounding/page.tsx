import type { Metadata } from "next";
import {useTranslations} from "next-intl";
import { getTranslations } from "next-intl/server";
import ExercisesHeader from "@/components/exercises/header";
import ExercisesGrounding from "@/components/exercises/grounding";
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
    path: "/exercises/grounding",
    title: tMethod("grounding"),
    description: tSeo("groundingDescription"),
  });
}

export default function Grounding() {
  const t = useTranslations('Method')
  const tApp = useTranslations('App')
  const tMenu = useTranslations('Menu')

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: tApp('title'), path: "/" },
          { name: tMenu('exercises'), path: "/exercises" },
          { name: t('grounding'), path: "/exercises/grounding" },
        ]}
      />
      <div className="container mx-auto px-10 py-8">
        <ExercisesHeader title={ t('grounding') }>
          <p className="text-base text-tx-primary whitespace-pre-line">
            { t('groundingReadMore') }
          </p>
        </ExercisesHeader>
        <div className="card-background">
          <ExercisesGrounding />
        </div>
        <p className="text-sm text-gray-500 mt-4">
          <a href={"https://www.urmc.rochester.edu/behavioral-health-partners/bhp-blog/april-2018/5-4-3-2-1-coping-technique-for-anxiety#:~:text=This%20five%2Dstep%20exercise%20can%20be%20very%20helpful,present%20when%20your%20mind%20is%20bouncing%20around."}
             target="_blank"
          >
            {t('source')}: University of Rochester Medical Center (SOAR, Inc)
          </a>
        </p>
      </div>
    </>
  );
}
