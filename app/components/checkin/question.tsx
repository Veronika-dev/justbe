import Image from "next/image";
import {ArrowLeft} from "lucide-react";
import Thoughts from "./thoughts";

export default function Question({
  question,
  answers,
  canGoBack = false,
  onBack,
  onAnswer
}: {
  question: string;
  answers: QuestionAnswer[];
  onAnswer: (value: number) => void;
  canGoBack: boolean;
  onBack: () => void;
}) {
  return (
    <div className="w-full pt-16">
      <div className="mb-16 relative">
        {canGoBack && (
          <button
            onClick={onBack}
            className="px-6 py-3 absolute left-0 top-0"
          >
            <ArrowLeft size={20} />
          </button>
        )}
        <h2 className="text-3xl text-center">{ question }</h2>
      </div>
      <div className={`grid ${answers.length === 5 ? 'grid-cols-5' : 'grid-cols-2'} gap-4`}>
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
      className="cursor-pointer py-2 px-6 hover:bg-primary/10 rounded-lg transition-colors duration-300"
    >
      {(answer.image || answer.thoughtPace != null) && (
        <div className="h-80 w-full flex items-center justify-center mb-4">
          {answer.image ? (
            <Image
              src={answer.image}
              alt={answer.title}
              className="w-full max-w-80 h-auto"
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
      <h3 className="text-xl text-center">{ answer.title }</h3>
    </button>
  )
}
