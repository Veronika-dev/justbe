'use client'

import {useState} from "react";
import {interactiveTypes} from "@/lib/variables";
import {useTranslations} from "next-intl";
import FinalStep from "@/components/exercises/final-step";
import ChooseType from "@/components/main/choose-type";
import LinesSimulation from "@/components/exercises/interactive/lines";
import SandSimulation from "@/components/exercises/interactive/sand-simulation";

export default function InteractiveSelector() {
  const t = useTranslations('Common')
  const tMethod = useTranslations('Method.interactiveSteps')

  const [finished, setFinished] = useState(false)
  const [type, setType] = useState<InteractiveType>('lines')

  const interactiveTypesList = interactiveTypes.map(item => ({
    id: item,
    title: tMethod(item),
  }))

  return (
    <>
      {
        finished
          ? <div className="card-background">
              <FinalStep usedMethod="interactive" />
            </div>
          : <div className="card-background p-0 overflow-hidden" style={{ height: '70vh' }}>
              {
                type === 'lines'
                  ? <LinesSimulation />
                  : <SandSimulation />
              }
            </div>
      }
      <div className="card-background mt-4 flex justify-between items-center">
        <ChooseType<InteractiveType> list={interactiveTypesList} value={type} setValue={setType} />
        <button onClick={() => setFinished(true)} className="btn-linear-outline">
          <span>{t('stop') }</span>
        </button>
      </div>
    </>
  )
}
