import {useTranslations} from "next-intl";
import ExercisesHeader from "@/components/exercises/header";

export default function Creative() {
  const t = useTranslations('Method')
  return (
    <div className="container mx-auto px-4 py-8">
      <ExercisesHeader title={ t('creative') } />
      <p className="whitespace-pre-line">
        {
          `Одна карточка с конкретным предложением что-то сделать руками.
База ~30 карточек. → — другое предложение.
Примеры:

"Найди три предмета одного цвета рядом с тобой"
"Нарисуй своё настроение тремя линиями"
"Напиши слово которое сейчас крутится в голове"
"Сложи что-нибудь из бумаги — любую форму"`
        }
      </p>
    </div>
  );
}
