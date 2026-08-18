import {useTranslations} from "next-intl";
import ExercisesHeader from "@/components/exercises/header";
import PmrExercise from "@/components/exercises/pmr";

export default function Pmr() {
  const t = useTranslations('Common')
  const tMethod = useTranslations('Method')
  return (
    <div className="container mx-auto px-4 py-8">
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
  );
}
