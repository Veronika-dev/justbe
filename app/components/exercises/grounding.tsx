'use client'

import {useEffect, useMemo, useState} from "react";
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
              <BreathingBox showStartScreen={false} />
              <p>{ t(`groundingSteps.start`) }</p>
            </div>
          : currentStepInfo && <StepItem step={currentStepInfo} />
      }
      {
        currentStep < 6
          ? <button onClick={goNextStep} className="bg-primary px-4 py-2 rounded-lg mt-4">
              { currentStep === 0 ? t('start') : t('continue') }
            </button>
          : <FinalStep usedMethod="grounding" onRestart={restart} />
      }
    </div>
  )
}

function StepItem({ step }: { step: Step }) {
  return (
    <div>
      <div className="text-8xl text-center">{step.stepNumber}</div>
      <h2 className="text-xl font-bold text-center mt-4">{step.title}</h2>
      <p className="text-center mt-2">{step.description}</p>
    </div>
  )
}
