import NextLink from "next/link";
import {useTranslations} from "next-intl";
import {Heart} from "lucide-react";
import { activityList } from '@/lib/variables'
import ExercisesCard from "@/components/exercises/card";
import {useMemo} from "react";

export default function FinalStep({ usedMethod, onRestart }: { usedMethod: Activity, onRestart?: () => void }) {
  const t = useTranslations('Method')
  const method = useMemo(() => {
    const activityListOther = activityList.filter(activity => activity !== usedMethod)
    return activityListOther[Math.floor(Math.random() * activityListOther.length)]
  }, [usedMethod])
  return (
    <div className="text-center">
      <h3 className="text-4xl flex items-center justify-center gap-2 mb-8">
        <span>{ t('wellDone.M') }</span>
        <Heart className="text-primary" size={30} />
      </h3>
      <p className="text-base">{ t('finalStep.M') }</p>
      <div className="max-w-1/3 mx-auto mb-16 mt-16">
        <p className="text-xl text-left mb-2">{ t('finalStep.offeredVariant') }</p>
        <ExercisesCard method={method} />
      </div>
      <div>
        {
          onRestart && <button className="bg-primary/10 px-4 py-2 rounded-lg mt-4 me-4 cursor-pointer" onClick={ onRestart }>
            { t('retakeTest') }
          </button>
        }
        <NextLink href="/exercises" className="bg-primary px-4 py-2 rounded-lg mt-4">
          { t('chooseAnother') }
        </NextLink>
      </div>
    </div>
  )
}
