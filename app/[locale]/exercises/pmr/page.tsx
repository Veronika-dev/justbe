import {useTranslations} from "next-intl";
import ExercisesHeader from "@/components/exercises/header";

export default function Pmr() {
  const t = useTranslations('Method')
  return (
    <div className="container mx-auto px-4 py-8">
      <ExercisesHeader title={ t('pmr') } />
      <p className="whitespace-pre-line">
        {
          `Анимированный гид по группам мышц (сжать → удержать → расслабить):
Ноги → Живот → Руки → Плечи → Лицо
Только визуал + ритм. Без голосового сопровождения в MVP.
Таймер на каждый шаг: напряжение 5 сек → расслабление 10 сек.`
        }
      </p>
      <p className="text-sm text-gray-500 mt-4">
        <a href={"https://www.health.harvard.edu/staying-healthy/try-this-progressive-muscle-relaxation-for-sleep"}>
          {t('source')}: Harvard Health Publishing
        </a>
      </p>
    </div>
  );
}
