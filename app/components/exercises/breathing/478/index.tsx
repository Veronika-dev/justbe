'use client'

import {useEffect, useMemo, useState} from "react";
import {useTranslations} from "next-intl";
import styles from './style.module.css'
import BreathingAnimation from "@/components/exercises/breathing/animation";

const lapCountsFinish = 7

export default function Breathing478Animation({ finishExerciseAction }: { finishExerciseAction: () => void }) {
  const t = useTranslations('Method.breathingSteps')

  const [timerToStart, setTimerToStart] = useState(3)
  const [step, setStep] = useState<BreathingStep | null>(null)
  const [firstLap, setFirstLap] = useState(true)
  const [rotation, setRotation] = useState(0)
  const [lapCount, setLapCount] = useState(0)

  useEffect(() => {
    if (step) return
    const timer = setInterval(() => {
      setTimerToStart(timerToStart - 1)
      if (timerToStart - 1 <= 0) {
        clearInterval(timer)
        setStep('inhale')
        setRotation(75)
      }
    }, 1000)
    return () => {
      clearInterval(timer)
    }
  })

  const intervalTime = !step ? 0 : step === 'inhale' ? 4000 : step === 'hold' ? 7000 : 8000

  useEffect(() => {
    if (!step) return
    const timeout = setTimeout(() => {
      switch (step) {
        case 'inhale':
          setStep('hold')
          setRotation(prev => Math.floor(prev / 360) * 360 + 207)
          break;
        case 'hold':
          setStep('exhale')
          setRotation(prev => Math.floor(prev / 360) * 360 + 360)
          break;
        case 'exhale':
          setStep('inhale')
          setRotation(prev => prev + 75)
          if (firstLap) {
            setFirstLap(false)
          }
          setLapCount(prev => {
            const newCount = prev + 1
            if (newCount >= lapCountsFinish) {
              setTimeout(() => finishExerciseAction(), 0)
            }
            return newCount
          })
          break;
      }
    }, intervalTime)
    return () => {
      if (timeout) window.clearTimeout(timeout)
    }
  }, [finishExerciseAction, firstLap, intervalTime, step])

  const circleStyle = useMemo(() => {
    return {
      transform: `rotate(${rotation}deg)`,
      transitionDuration: `${intervalTime}ms`,
    }
  }, [rotation, intervalTime])

  const status: BreathingAnimationStatus = (!step || step === 'hold1' || step === 'hold2') ? 'hold' : step

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-80 h-80 relative rounded-full bg-primary/30 p-8">
        <div className={`w-80 h-80 absolute top-0 left-0 rounded-full bg-primary/15 ${styles.sectorHold}`}/>
        <div className={`w-80 h-80 absolute top-0 left-0 rounded-full bg-primary/30 ${styles.sectorExhale}`}/>
        <div className="rounded-full bg-primary w-full h-full flex flex-col items-center justify-center relative">
          <div className="w-[60%] h-[60%] flex items-center justify-center mb-2">
            <BreathingAnimation status={status} duration={intervalTime} />
          </div>
          {
            step
              ? <p className="text-center text-lg uppercase">{ t(step) }</p>
              : <p className="text-center text-xl">{ timerToStart }</p>
          }
        </div>
        <div className="w-80 h-80 absolute top-0 left-0 rounded-full transition-transform ease-linear" style={circleStyle}>
          <div className="w-7 h-7 absolute top-[0.15rem] left-[50%] transform-[translateX(-50%)] bg-primary rounded-full" />
        </div>
      </div>
      <div className="mt-8 min-h-10">
        { step && firstLap && <p className="text-lg opacity-60 text-center">
            { t(`${step}478Description`) }
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
