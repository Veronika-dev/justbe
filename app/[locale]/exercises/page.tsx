import ExercisesCard from "@/components/exercises/card";
import {useTranslations} from "next-intl";
import { activityList } from '@/lib/variables'
import { Sparkles, Heart } from "lucide-react";

export default function Exercises() {
  const t = useTranslations()
  return (
    <div className="container mx-auto px-10 py-8">
      <h1 className="text-3xl mb-4">{ t('Menu.exercises') }</h1>
      <p className="text-base mb-8 opacity-80">{ t('exercisesDesc') }</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {
          activityList.map((activity) => (
            <ExercisesCard key={activity} method={activity} />
          ))
        }
      </div>
      <div className="flex items-center justify-center gap-2 mt-8">
        <Sparkles width={20} height={20} className="text-yellow-600" />
        <span className="text-white/50">{ t('exercisesBottom') }</span>
        <Heart width={20} height={20} className="text-white/50" />
      </div>
    </div>
  );
}
