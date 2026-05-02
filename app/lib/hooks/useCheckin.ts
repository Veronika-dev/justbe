import {useState} from 'react';
import { useNightMode } from "@/lib/hooks/useNightMode";

const getTimestamp = () => Date.now() / 1000;

const getModeVariant = (modeScheme: ModeScheme, level: number): Activity => {
  let modeVariants;
  if (level >= 5) modeVariants = modeScheme[5];
  else if (level >= 4) modeVariants = modeScheme[4];
  else if (level >= 3) modeVariants = modeScheme[3];
  else if (level >= 2) modeVariants = modeScheme[2];
  else modeVariants = modeScheme[1];

  const randomIndex = Math.floor(Math.random() * modeVariants.length);
  return modeVariants[randomIndex];
};

const buildResult = (
  answer1: number,
  answer2: number,
  answer3: number | null,
  timestamp: number,
  variant: Activity
) => {
  let level = (answer1 + answer2) / 2;

  if (answer3) {
    level += 2;
  }

  return {
    level,
    answers: [answer1, answer2, answer3 ?? 0],
    timestamp,
    variant,
  };
};

export function useCheckin(setCurrentResult: (result: CheckInResult | null) => void) {
  const { modeScheme } = useNightMode();

  const [currentStep, setCurrentStep] = useState(0);
  const [q1, setQ1] = useState<number | null>(null);
  const [q2, setQ2] = useState<number | null>(null);
  const [q3, setQ3] = useState<number | null>(null);
  const [result, setResult] = useState<CheckInResult | null>(null);

  const handleAnswer = (value: number) => {
    if (currentStep === 0) {
      setQ1(value);
      setCurrentStep(1);
    } else if (currentStep === 1) {
      setQ2(value);

      // Проверяем, нужен ли Q3
      const avg = ((q1! + value) / 2);
      if (avg >= 2.5 && avg <= 3.5) {
        setCurrentStep(2);
      } else {
        const level = (q1! + value) / 2;
        const nextResult = buildResult(
          q1!,
          value,
          null,
          getTimestamp(),
          getModeVariant(modeScheme, level)
        );
        setResult(nextResult);
        setCurrentResult(nextResult);
        setCurrentStep(3); // Завершено
      }
    } else if (currentStep === 2) {
      setQ3(value);
      const level = (q1! + q2!) / 2 + (value ? 2 : 0);
      const nextResult = buildResult(
        q1!,
        q2!,
        value,
        getTimestamp(),
        getModeVariant(modeScheme, level)
      );
      setResult(nextResult);
      setCurrentResult(nextResult);
      setCurrentStep(3); // Завершено
    }
  };

  const handleBack = () => {
    if (currentStep === 1) {
      setCurrentStep(0);
      setQ1(null);
    } else if (currentStep === 2) {
      setCurrentStep(1);
      setQ2(null);
    } else if (currentStep === 3) {
      setResult(null);
      setCurrentResult(null);
      // Если Q3 был, вернуться к нему
      if (q3 !== null) {
        setCurrentStep(2);
        setQ3(null);
      } else {
        setCurrentStep(1);
        setQ2(null);
      }
    }
  };

  const resetResult = () => {
    setQ1(null);
    setQ2(null);
    setQ3(null);
    setResult(null);
    setCurrentResult(null);
    setCurrentStep(0);
  }

  const isComplete = currentStep === 3;

  return {
    currentStep,
    handleAnswer,
    handleBack,
    isComplete,
    result,
    canGoBack: currentStep > 0 && currentStep < 3,
    resetResult,
  };
}
