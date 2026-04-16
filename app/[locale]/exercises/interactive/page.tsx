import {useTranslations} from "next-intl";
import ExercisesHeader from "@/components/exercises/header";
import InteractiveSelector from "@/components/exercises/interactive/selector";

export default function Interactive() {
  const t = useTranslations('Method')
  return (
    <div className="container mx-auto px-4 py-8">
      <ExercisesHeader title={ t('interactive') }>
        <p className="text-base text-tx-primary whitespace-pre-line">
          { t('interactiveReadMore') }
        </p>
      </ExercisesHeader>
      <InteractiveSelector />
    </div>
  );
}
