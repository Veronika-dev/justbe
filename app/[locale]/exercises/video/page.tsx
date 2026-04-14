import {useTranslations} from "next-intl";
import ExercisesHeader from "@/components/exercises/header";

export default function Video() {
  const t = useTranslations('Method')
  return (
    <div className="container mx-auto px-4 py-8">
      <ExercisesHeader title={ t('video') } />
      <p className="whitespace-pre-line">
        {
          `YouTube IFrame API, скрыты все контролы. Автовоспроизведение (muted).
Категории: вода, огонь, аквариум, лес, снег, ночное небо.
Навигация: почти невидимые → (следующее) и • (смена категории) внизу экрана.`
        }
      </p>
    </div>
  );
}
