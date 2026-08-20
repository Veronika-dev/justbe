'use client'

import {useState} from "react";
import {useTranslations} from "next-intl";
import BreathingBox from "@/components/exercises/breathing/box";
import FinalStep from "@/components/exercises/final-step";

export default function Grounding() {
  const [currentStep, setCurrentStep] = useState(0)
  const t = useTranslations('Method')
  const currentStepInfo: Step | null = currentStep > 0 && currentStep < 6
    ? {
      step: currentStep,
      stepNumber: 5 - currentStep + 1,
      title: t(`groundingSteps.${currentStep}`),
      description: t(`groundingSteps.${currentStep}desc`),
    }
    : null

  const goNextStep = () => {
    setCurrentStep(currentStep + 1)
  }

  const restart = () => {
    setCurrentStep(0)
  }

  return (
    <div>
      {
        currentStep === 0
          ? <div>
            <p className="text-center mx-auto mb-8 sm:max-w-3/4 md:max-w-1/2">{ t(`groundingSteps.start`) }</p>
            <BreathingBox finishExerciseAction={goNextStep} />
            </div>
          : currentStepInfo && <StepItem step={currentStepInfo} />
      }
      {
        currentStep < 6
          ? <div className="text-center mt-6">
              <button onClick={goNextStep} className="button-linear w-full sm:w-auto sm:rounded-xl sm:px-12 sm:py-4 sm:text-xl">
                { currentStep === 0 ? t('start') : t('continue') }
              </button>
            </div>
          : <FinalStep usedMethod="grounding" onRestart={restart} />
      }
    </div>
  )
}

function StepItem({ step }: { step: Step }) {
  return (
    <div>
      <div className="text-7xl sm:text-9xl text-center">{step.stepNumber}</div>
      <h2 className="text-xl font-bold text-center mt-4">{step.title}</h2>
      <p className="text-center mt-2">{step.description}</p>
    </div>
  )
}
