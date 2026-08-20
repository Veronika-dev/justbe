import Image from "next/image";
import {ArrowLeft} from "lucide-react";
import Thoughts from "./thoughts";

export default function Question({
  question,
  description,
  answers,
  canGoBack = false,
  onBack,
  onAnswer
}: {
  question: string;
  description: string;
  answers: QuestionAnswer[];
  onAnswer: (value: number) => void;
  canGoBack: boolean;
  onBack: () => void;
}) {
  return (
    <div className="w-full pt-8 md:pt-16">
      <div className="mb-8 md:mb-16 relative">
        {canGoBack && (
          <button
            onClick={onBack}
            className="px-2 md:px-6 py-2 md:py-3 absolute left-0 -top-6 sm:top-0"
          >
            <ArrowLeft size={20} />
          </button>
        )}
        <h2 className="text-2xl md:text-3xl text-center mb-2">{ question }</h2>
        <p className="text-base text-center opacity-80">{ description }</p>
      </div>
      <div className={`grid grid-cols-2 ${answers.length === 5 ? 'md:grid-cols-3 xl:grid-cols-5' : ''} gap-4`}>
        { answers.map((answer) => (
          <Answer
            key={answer.id}
            answer={answer}
            onSelect={() => onAnswer(answer.value)}
          />
        ))}
      </div>
    </div>
  )
}

function Answer({
  answer,
  onSelect
}: {
  answer: QuestionAnswer;
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      className="cursor-pointer py-2 px-3 sm:px-6 hover:bg-primary/10 rounded-lg transition-colors duration-300"
    >
      {(answer.image || answer.thoughtPace != null) && (
        <div className="h-44 md:h-60 lg:h-80 w-full flex items-center justify-center mb-4">
          {answer.image ? (
            <Image
              src={answer.image}
              alt={answer.title}
              className="w-full max-w-40 md:max-w-80 h-auto"
              width={answer.width}
              height={answer.height}
            />
          ) : (
            answer.thoughtPace != null && (
              <Thoughts pace={answer.thoughtPace} />
            )
          )}
        </div>
      )}
      <h3 className="text-lg md:text-xl text-center">{ answer.title }</h3>
    </button>
  )
}
