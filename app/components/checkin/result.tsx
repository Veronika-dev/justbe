import {useTranslations} from "next-intl";
import ExercisesCard from "@/components/exercises/card";
import NextLink from "next/link";

export default function CheckinResult({ result, resetResult }: {
  result: CheckInResult;
  resetResult: () => void;
}) {
  const t = useTranslations('Checkin');
  return (
    <div className="pt-8 md:pt-16">
      <h2 className="text-3xl md:text-4xl text-center mb-4 md:mb-8">{ t('stressLevel') }: {result?.level}</h2>
      <p className="text-lg md:text-xl text-center mb-8 md:mb-12">{ t('offeredVariant') }</p>
      <div className="sm:max-w-1/3 mx-auto mb-8 md:mb-16">
        <ExercisesCard method={result.variant}  />
      </div>
      <div className="flex flex-wrap items-center justify-center w-full gap-4">
        <NextLink href="/exercises" className="">{ t('change') }</NextLink>
        <button className="cursor-pointer" onClick={ resetResult }>{ t('retakeTest') }</button>
      </div>
    </div>
  );
}
