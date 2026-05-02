import Image from 'next/image'
import {useMethod} from "@/lib/hooks/useMethod";
import {useTranslations} from "next-intl";
import NextLink from "next/link";

export default function ExercisesCard({ method } : { method: Activity }) {
  const { methodData } = useMethod(method)
  const t = useTranslations('Method')
  if (methodData === null) {
    return null
  }
  return (
    <NextLink href={`/exercises/${method}`}>
      {
        methodData.image
          ? <Image src={ methodData.image } alt={ methodData.title } width={860} height={500} loading="eager" className="rounded-lg w-full" />
          : <div className="rounded-lg h-32 bg-gray-500" />
      }
      <div className="py-4 text-left">
        <h3 className="text-xl mb-4 hover:opacity-85">{ methodData.title }</h3>
        <p className="text-md opacity-60 mb-4">{methodData.description}</p>
        <p className="" role="link">{ t('start') }</p>
      </div>
    </NextLink>
  )
}
