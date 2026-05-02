'use client';

import { useCheckin } from "@/lib/hooks/useCheckin";
import Question from "./question";
import {useTranslations} from "next-intl";
import {useMemo} from "react";
import CheckinResult from "@/components/checkin/result";
import {useCheckinStore} from "@/providers/checkin-store-provider";

export default function Checkin() {
  const t = useTranslations('Checkin');
  const questions: QuestionCheckin[] = useMemo(() => {
    return [
      {
        id: 'q1',
        question: t(`q1`),
        answers: [
          {id: 1, title: t(`answers1.0`), value: 1, image: '/mascot/sleepy.svg', width: 739, height: 422},
          {id: 2, title: t(`answers1.1`), value: 2, image: '/mascot/calm.svg', width: 434, height: 534},
          {id: 3, title: t(`answers1.2`), value: 3, image: '/mascot/tense.svg', width: 477, height: 474},
          {id: 4, title: t(`answers1.3`), value: 4, image: '/mascot/tight.svg', width: 445, height: 452},
          {id: 5, title: t(`answers1.4`), value: 5, image: '/mascot/verytight.svg', width: 434, height: 454}
        ]
      },
      {
        id: 'q2',
        question: t(`q2`),
        answers: [
          {id: 1, title: t(`answers2.0`), value: 1, thoughtPace: 1},
          {id: 2, title: t(`answers2.1`), value: 2, thoughtPace: 2},
          {id: 3, title: t(`answers2.2`), value: 3, thoughtPace: 3},
          {id: 4, title: t(`answers2.3`), value: 4, thoughtPace: 4},
          {id: 5, title: t(`answers2.4`), value: 5, thoughtPace: 5}
        ]
      },
      {
        id: 'q3',
        question: t(`q3`),
        answers: [
          {id: 1, title: t(`answers3.0`), value: 2, image: '/mascot/no.svg', width: 480, height: 448},
          {id: 2, title: t(`answers3.1`), value: 0, image: '/mascot/yes2.svg', width: 560, height: 474}
        ]
      }
    ]
  }, [t]);

  const { setCurrentResult } = useCheckinStore((state) => state)
  const { currentStep, handleAnswer, handleBack, canGoBack, isComplete, result, resetResult } = useCheckin(setCurrentResult);

  if (isComplete) {
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
