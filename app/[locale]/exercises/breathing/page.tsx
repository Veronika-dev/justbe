import {useTranslations} from "next-intl";
import ExercisesHeader from "@/components/exercises/header";
import ExercisesGrounding from "@/components/exercises/grounding";

export default function Breathing() {
  const t = useTranslations('Method')
  return (
    <div className="container mx-auto px-4 py-8">
      <ExercisesHeader title={ t('breathing') }>
        <p className="text-base text-tx-primary whitespace-pre-line">
          { t('breathingReadMore') }
        </p>
      </ExercisesHeader>
      <div className="card-background">

      </div>
      <p>
        {
          `Техники 4-7-8 и бокс-дыхание.
Три визуальных варианта (алгоритм выбирает один):

Круг — SVG круг расширяется/сужается
Волна — SVG путь поднимается/опускается
Точка — одна точка растёт и уменьшается

Темп адаптируется под уровень: уровень 4 → медленнее (4-7-8), уровень 3 → быстрее (бокс).
Текстовые подсказки (вдох/задержка/выдох) исчезают после 3 циклов.
Автозавершение через 5 минут → мягкий переход в состояние покоя.`
        }
      </p>
      <p className="text-sm text-gray-500 mt-4">
        <a href={"https://www.bhf.org.uk/informationsupport/heart-matters-magazine/wellbeing/breathing-exercises"}
           target="_blank"
        >
          {t('source')}: British Heart Foundation
        </a>
      </p>
    </div>
  );
}
