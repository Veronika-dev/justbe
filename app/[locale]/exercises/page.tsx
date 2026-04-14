import ExercisesCard from "@/components/exercises/card";
import {useTranslations} from "next-intl";
import { activityList } from '@/lib/variables'

export default function Exercises() {
  const t = useTranslations('Menu')
  return (
    <div className="container mx-auto px-10 py-8">
      <h1 className="text-3xl mb-8">{ t('exercises') }</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {
          activityList.map((activity) => (
            <ExercisesCard key={activity} method={activity} />
          ))
        }
      </div>
    </div>
  );
}
