'use client'

import {useEffect, useState} from "react";
import {interactiveTypes} from "@/lib/variables";
import {useTranslations} from "next-intl";
import FinalStep from "@/components/exercises/final-step";
import ChooseType from "@/components/main/choose-type";
import LinesSimulation from "@/components/exercises/interactive/lines";
import SandSimulation from "@/components/exercises/interactive/sand-simulation";
import Image from "next/image";

export default function InteractiveSelector() {
  const t = useTranslations('Common')
  const tMethod = useTranslations('Method.interactiveSteps')

  const [startScreen, setStartScreen] = useState(true)
  const [finished, setFinished] = useState(false)
  const [type, setType] = useState<InteractiveType>('lines')

  const interactiveTypesList = interactiveTypes.map(item => ({
    id: item,
    title: tMethod(item),
  }))

  useEffect(() => {
    if (startScreen) {
      setTimeout(() => {
        setStartScreen(false)
      }, 1000)
    }
  }, [startScreen])

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
              {
                <div className={`text-center absolute top-0 left-0 w-full h-full inset-0 flex flex-col items-center justify-center p-4 transition-opacity duration-500 ease-in-out pointer-events-none ${startScreen ? 'opacity-100' : 'opacity-0'}`}>
                  <h2 className="text-4xl font-bold mb-4 max-w-1/2">{tMethod('touchScreenToStart') }</h2>
                  <Image src="/img-touch.png" alt="Touch screen" width={120} height={120} />
                </div>
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
