'use client'

import {useEffect, useMemo, useState} from "react";
import {useTranslations} from "next-intl";
import BreathingAnimation from "@/components/exercises/breathing/animation";

const lapCountsFinish = 8

export default function BreathingBoxAnimation({ finishExerciseAction }: { finishExerciseAction: () => void }) {
  const t = useTranslations('Method.breathingSteps')

  const [timerToStart, setTimerToStart] = useState(3)
  const [step, setStep] = useState<BreathingStep | null>(null)
  const [firstLap, setFirstLap] = useState(true)
  const [lapCount, setLapCount] = useState(0)

  useEffect(() => {
    if (step) return
    const timer = setInterval(() => {
      setTimerToStart(timerToStart - 1)
      if (timerToStart - 1 <= 0) {
        clearInterval(timer)
        setStep('inhale')
      }
    }, 1000)
    return () => {
      clearInterval(timer)
    }
  })

  useEffect(() => {
    if (!step) return
    const interval = setInterval(() => {
      switch (step) {
        case 'inhale':
          setStep('hold1')
          break;
        case 'hold1':
          setStep('exhale')
          break;
        case 'exhale':
          setStep('hold2')
          break;
        case 'hold2':
          if (firstLap) {
            setFirstLap(false)
          }
          setStep('inhale')
          if (lapCount >= lapCountsFinish) {
            finishExerciseAction()
          } else {
            setLapCount(lapCount + 1)
          }
          break;
      }
    }, 4000)
    return () => {
      clearInterval(interval)
    }
  }, [step, firstLap, lapCount, finishExerciseAction])

  const circleStyle = useMemo(() => {
    let transform
    switch (step) {
      case 'exhale':
        transform = 'translate3d(.1rem, 18.1rem, 0)'
        break;
      case 'hold1':
        transform = 'translate3d(18.1rem, 18.1rem, 0)'
        break;
      case 'hold2':
        transform = 'translate3d(.1rem, .1rem, 0)'
        break;
      case 'inhale':
        transform = 'translate3d(18.1rem, .1rem, 0)'
        break;
      default:
        transform = 'translate3d(.1rem, .1rem, 0)'
        break;
    }
    return {
      transform,
      opacity: !step ? 0 : 1,
    }
  }, [step])

  const status: BreathingAnimationStatus = (!step || step === 'hold1' || step === 'hold2') ? 'hold' : step

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-80 h-80 relative rounded-3xl bg-primary/30 p-8">
        <div className="relative rounded-[0.875rem] bg-primary/30 w-full h-full flex flex-col items-center justify-center">
          <div className="w-[70%] h-[70%] flex items-center justify-center mb-2">
            <BreathingAnimation status={status} />
          </div>
          {
            step
              ? <p className="relative text-center text-lg uppercase">{ step === 'hold1' || step === 'hold2' ? t('hold') : t(step) }</p>
              : <p className="relative text-center text-xl">{ timerToStart }</p>
          }
        </div>
        <div className="w-7 h-7 absolute top-0 left-0 bg-primary rounded-full transition-transform duration-4000 ease-[cubic-bezier(.38,.53,.51,.6)]" style={circleStyle} />
      </div>
      <div className="mt-8 sm:min-h-10">
        { step && firstLap && <p className="text-base md:text-lg opacity-60 text-center">
            { step === 'hold1' || step === 'hold2' ? t('holdDescription') : t(`${step}Description`) }
          </p>
        }
        {
          step && lapCount >= lapCountsFinish && <div className="flex flex-col items-center justify-center">
            <p className="text-md opacity-60 text-center">{ t('oneMoreTime') }</p>
            <p className="text-md opacity-60 text-center">
              { t('or') } <button onClick={() => setLapCount(0)} className="underline cursor-pointer">{ t('continueExercise') }</button>
            </p>
          </div>
        }
      </div>
    </div>
  )
}
