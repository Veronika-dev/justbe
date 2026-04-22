import {useTranslations} from "next-intl";
import ExercisesHeader from "@/components/exercises/header";
import CreativeCards from "@/components/exercises/creative/cards";
import {Suspense} from "react";

export default function Creative() {
  const t = useTranslations('Method')
  return (
    <div className="container mx-auto px-4 py-8">
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
  );
}
