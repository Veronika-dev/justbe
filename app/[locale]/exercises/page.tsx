import type { Metadata } from "next";
import ExercisesCard from "@/components/exercises/card";
import {useTranslations} from "next-intl";
import { getTranslations } from "next-intl/server";
import { activityList } from '@/lib/variables'
import { Sparkles, Heart } from "lucide-react";
import { createPageMetadata } from "@/lib/seo";
import BreadcrumbJsonLd from "@/components/seo/breadcrumb-json-ld";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const tMenu = await getTranslations({ locale, namespace: "Menu" });
  const tSeo = await getTranslations({ locale, namespace: "Seo" });

  return createPageMetadata({
    locale,
    path: "/exercises",
    title: tMenu("exercises"),
    description: tSeo("exercisesDescription"),
  });
}

export default function Exercises() {
  const t = useTranslations()
  const tApp = useTranslations('App')

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: tApp('title'), path: "/" },
          { name: t('Menu.exercises'), path: "/exercises" },
        ]}
      />
      <div className="container mx-auto px-10 py-8">
        <h1 className="text-3xl mb-4">{ t('Menu.exercises') }</h1>
        <p className="text-base mb-8 opacity-80">{ t('exercisesDesc') }</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {
            activityList.map((activity) => (
              <ExercisesCard key={activity} method={activity} />
            ))
          }
        </div>
        <div className="flex items-center justify-center gap-2 mt-8">
          <Sparkles width={20} height={20} className="text-yellow-600" />
          <span className="text-white/50">{ t('exercisesBottom') }</span>
          <Heart width={20} height={20} className="text-white/50" />
        </div>
      </div>
    </>
  );
}
