import Image from 'next/image'
import NextLink from 'next/link'
import { useMethod } from '@/lib/hooks/useMethod'
import { useTranslations } from 'next-intl'
import { ChevronRight } from "lucide-react";

export default function ExercisesCard({ method }: { method: Activity }) {
  const { methodData } = useMethod(method)
  const t = useTranslations('Method')

  if (methodData === null) return null

  return (
    <NextLink
      href={`/exercises/${method}`}
      className="
        group relative flex h-full flex-col overflow-hidden rounded-[28px]
        border border-primary-200 bg-primary-100
        transition-all duration-500
        hover:-translate-y-1 hover:border-white/10
        hover:shadow-[0_24px_80px_rgba(0,0,0,0.45)]
      "
    >
      <div
        className="
          pointer-events-none absolute -left-16 -top-16 h-36 w-36
          rounded-full bg-white/10 blur-3xl
          transition-opacity duration-500 group-hover:opacity-80
        "
      />

      <Image src={`/exercises/ic-${method}.svg`} width={60} height={60} className="absolute left-4 top-4 max-w-1/8 h-auto" alt="" />

      <div className="relative z-10 flex h-full flex-col">
        <div
          className="relative flex items-center justify-center overflow-hidden"
        >
          {methodData.image ? (
            <Image
              src={methodData.image}
              alt={methodData.title}
              width={860}
              height={500}
              loading="eager"
              className="
                w-full object-contain
                transition-transform duration-700
                group-hover:scale-[1.04]
              "
            />
          ) : (
            <div className="h-full w-full rounded-3xl bg-white/10" />
          )}
        </div>

        <div className="flex flex-1 flex-col items-start px-5 pb-5 text-left">
          <h3 className="mb-2 text-xl font-medium tracking-[-0.02em] text-white/80">
            {methodData.title}
          </h3>

          <p className="mb-4 max-w-sm text-base leading-normal text-white/50">
            {methodData.description}
          </p>

          <div
            className="
              mt-auto inline-flex items-center justify-center gap-1 rounded-full
              border border-white/10 bg-white/6
              px-5 py-2 text-md text-white
              transition-all duration-300
              group-hover:border-white/20 group-hover:bg-white/10
            "
            role="link"
          >
            <span className="leading-none">{t('start')}</span>
            <ChevronRight className="h-4 w-4 mt-0.5" />
          </div>
        </div>
      </div>
    </NextLink>
  )
}
