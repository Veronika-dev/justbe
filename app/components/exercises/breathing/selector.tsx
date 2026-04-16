'use client'

import {memo, useEffect, useState} from "react";
import {useCheckinStore} from "@/providers/checkin-store-provider";
import Breathing478Animation from "@/components/exercises/breathing/478";
import BreathingBoxAnimation from "@/components/exercises/breathing/box";
import {Listbox, ListboxButton, ListboxOptions, ListboxOption, Button} from '@headlessui/react'
import {breathingTypes} from "@/lib/variables";
import {useTranslations} from "next-intl";
import { ChevronDown, Check } from 'lucide-react'
import FinalStep from "@/components/exercises/final-step";

interface BreathingBoxProps {
  showStartScreen?: boolean
}

export default function BreathingSelector({ showStartScreen = true }: BreathingBoxProps) {
  const { currentResult } = useCheckinStore((state) => state)

  const [startScreen, setStartScreen] = useState(showStartScreen)
  const [finished, setFinished] = useState(false)
  const [type, setType] = useState<BreatingType>(currentResult && currentResult.level >= 4 ? '478' : 'box')

  const t = useTranslations('Common')

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
        <ChooseBreathingType type={type} setType={setType} />
        <button onClick={() => setStartScreen(!startScreen)} className="btn-linear-outline">
          <span>{startScreen ? t('start') : t('stop') }</span>
        </button>
      </div>
    </>
  )
}

const ChooseBreathingType = memo(function ChooseBreathingType({ type, setType }: { type: BreatingType, setType: (type: BreatingType) => void }) {
  const t = useTranslations('Method.breathingTypes')
  return (
    <Listbox value={type} onChange={setType}>
      <ListboxButton
        className="relative w-60 rounded-lg border border-primary/30 py-1.5 pr-8 pl-3 text-left text-sm/6 text-white focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25"
      >
        { t(type) }
        <ChevronDown
          className="pointer-events-none absolute top-2.5 right-2.5"
          size={16}
          aria-hidden="true"
        />
      </ListboxButton>
      <ListboxOptions
        anchor="bottom"
        transition
        className="w-(--button-width) rounded-lg border border-primary/10 bg-primary-100 p-1 focus:outline-none transition duration-100 ease-in data-leave:data-closed:opacity-0"
      >
        {breathingTypes.map((breathingType) => (
          <ListboxOption
            key={breathingType}
            value={breathingType}
            className="group flex cursor-default items-center gap-2 rounded-lg px-3 py-1.5 select-none data-focus:bg-white/10"
          >
            <Check className="invisible group-data-selected:visible" size={16} />
            <div className="text-sm/6 text-white">{ t(breathingType) }</div>
          </ListboxOption>
        ))}
      </ListboxOptions>
    </Listbox>
  )
})
