'use client'

import {useMemo, useState} from "react";
import {useCheckinStore} from "@/providers/checkin-store-provider";
import Breathing478Animation from "@/components/exercises/breathing/478";
import BreathingBoxAnimation from "@/components/exercises/breathing/box";
import {breathingTypes} from "@/lib/variables";
import {useTranslations} from "next-intl";
import FinalStep from "@/components/exercises/final-step";
import ChooseType from "@/components/main/choose-type";

interface BreathingBoxProps {
  showStartScreen?: boolean
}

export default function BreathingSelector({ showStartScreen = true }: BreathingBoxProps) {
  const t = useTranslations('Common')
  const tMethod = useTranslations('Method.breathingTypes')

  const { currentResult } = useCheckinStore((state) => state)

  const [startScreen, setStartScreen] = useState(showStartScreen)
  const [finished, setFinished] = useState(false)
  const [type, setType] = useState<BreatingType>(currentResult && currentResult.level >= 4 ? '478' : 'box')

  const breathingTypesList = breathingTypes.map(item => ({
    id: item,
    title: tMethod(item),
  }))

  return (
    <>
      {
        startScreen
          ? <div className="card-background">
              <p>
                Тут сменяются картинки с продолжительностью-прогрессбаром.
                1. Choose whatever position feels most relaxing: sitting, standing with your back straight or lying down with your arms by your side.
                2. Close your eyes if it feels right for you.
                3. relax your shoulders, release any tension in your jaw and let your body settle
                4. You are ready to start.
              </p>
            </div>
          :
          !finished && <div className="card-background">
              {
                type === '478'
                  ? <Breathing478Animation finishExerciseAction={() => setFinished(true)} />
                  : <BreathingBoxAnimation finishExerciseAction={() => setFinished(true)} />
              }
            </div>
      }
      {
        finished && <FinalStep usedMethod="breathing" />
      }
      <div className="card-background mt-4 flex justify-between items-center">
        <ChooseType<BreatingType> list={breathingTypesList} value={type} setValue={setType} />
        <button onClick={() => setStartScreen(!startScreen)} className="btn-linear-outline">
          <span>{startScreen ? t('start') : t('stop') }</span>
        </button>
      </div>
    </>
  )
}
