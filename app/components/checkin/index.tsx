'use client';

import { useCheckin } from "@/lib/hooks/useCheckin";
import Question from "./question";
import {useTranslations} from "next-intl";
import {useEffect, useMemo} from "react";
import CheckinResult from "@/components/checkin/result";
import {useCheckinStore} from "@/providers/checkin-store-provider";

export default function Checkin() {
  const t = useTranslations('Checkin');
  const questions = useMemo(() => {
    return [
      {
        id: 'q1',
        question: t(`q1`),
        answers: [
          {id: 1, title: t(`answers1.0`), value: 1},
          {id: 2, title: t(`answers1.1`), value: 2},
          {id: 3, title: t(`answers1.2`), value: 3},
          {id: 4, title: t(`answers1.3`), value: 4},
          {id: 5, title: t(`answers1.4`), value: 5}
        ]
      },
      {
        id: 'q2',
        question: t(`q2`),
        answers: [
          {id: 1, title: t(`answers2.0`), value: 1},
          {id: 2, title: t(`answers2.1`), value: 2},
          {id: 3, title: t(`answers2.2`), value: 3},
          {id: 4, title: t(`answers2.3`), value: 4},
          {id: 5, title: t(`answers2.4`), value: 5}
        ]
      },
      {
        id: 'q3',
        question: t(`q3`),
        answers: [
          {id: 1, title: t(`answers3.0`), value: 2},
          {id: 2, title: t(`answers3.1`), value: 0}
        ]
      }
    ]
  }, []);
  const { currentStep, handleAnswer, handleBack, canGoBack, isComplete, getResult, resetResult } = useCheckin();

  const { setCurrentResult } = useCheckinStore((state) => state)

  useEffect(() => {
    setCurrentResult(getResult())
  }, [isComplete])

  if (isComplete) {
    const result = getResult();
    if (result) {
      return (
        <CheckinResult result={result} resetResult={resetResult} />
      );
    }
  }

  const currentQuestion = questions[currentStep];

  return (
    <>
      <Question
        question={currentQuestion.question}
        answers={currentQuestion.answers}
        canGoBack={canGoBack}
        onAnswer={handleAnswer}
        onBack={handleBack}
      />
    </>
  );
}
