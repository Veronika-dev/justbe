'use client'

import {useMemo, useState} from 'react'
import { ArrowRight, ArrowLeft, ExternalLink, Dices } from 'lucide-react'
import {creativeTypes} from "@/lib/variables";
import {useTranslations} from "next-intl";

interface CreativeCard {
  id: string
  title: string
  description: string
  link?: string
}

export default function CreativeCards() {
  const t = useTranslations('Method.creativeSteps')

  const cardsList = useMemo<CreativeCard[]>(() =>
    creativeTypes.map(type => ({
      id: type,
      title: t(`${type}Title`),
      description: t(`${type}Description`),
      link: t(`link.${type}`)
    })), [t])

  const [index, setIndex] = useState(() => 0)

  const prev = () => setIndex(i => (i - 1 + cardsList.length) % cardsList.length)
  const next = () => setIndex(i => (i + 1) % cardsList.length)
  const selectRandom = () => setIndex(Math.floor(Math.random() * cardsList.length))

  const card = cardsList[index]

  return (
    <div className="flex flex-col items-center gap-6 py-4 max-w-120 mx-auto">
      <Card card={card} />
      <div className="flex justify-start w-full relative">
        <button
          onClick={selectRandom}
          className="p-3 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors cursor-pointer absolute left-0"
          aria-label={t('random')}
        >
          <Dices size={20} />
        </button>
        <div className="flex items-center gap-6 mx-auto">
          <button
            onClick={prev}
            className="p-3 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors cursor-pointer"
            aria-label={t('prev')}
          >
            <ArrowLeft size={20} />
          </button>
          <span className="text-sm opacity-40 tabular-nums">
          {index + 1} / {cardsList.length}
        </span>
          <button
            onClick={next}
            className="p-3 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors cursor-pointer"
            aria-label={t('next')}
          >
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}

function Card({ card }: { card: CreativeCard }) {
  const t = useTranslations('Common')
  return (
    <div className="w-full rounded-2xl card-background p-8 min-h-48">
      <div>
        <h2 className="text-2xl font-semibold mb-3">{card.title}</h2>
        <p className="text-base opacity-70 leading-relaxed">{card.description}</p>
      </div>
      {card.link && (
        <div className="text-right">
          <a
            href={card.link}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-linear-outline mt-10"
          >
          <span className="flex items-center gap-2">
            { t('readMore') }
            <ExternalLink size={14} />
          </span>
          </a>
        </div>
      )}
    </div>
  )
}
