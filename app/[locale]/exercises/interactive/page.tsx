import {useTranslations} from "next-intl";
import ExercisesHeader from "@/components/exercises/header";

export default function Interactive() {
  const t = useTranslations('Method')
  return (
    <div className="container mx-auto px-4 py-8">
      <ExercisesHeader title={ t('interactive') } />
      <p className="whitespace-pre-line">
        {
          `Canvas API. Алгоритм выбирает одно занятие:
Песок Частицы текут под пальцем/курсором. Физика гравитации 
Точки Соединяешь появляющиеся точки. Растворяются, появляются снова
Пиксели Закрашиваешь пиксели случайного цвета. Нет цели
Линии Рисуешь — линии медленно растворяются
Никакого счёта, никакой цели, никакой победы.`
        }
      </p>
    </div>
  );
}
