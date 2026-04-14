import {useTranslations} from "next-intl";
import { Info } from "lucide-react";
import Modal from "@/components/main/modal";

export default function Header({ title, children }: { title: string, children?: React.ReactNode }) {
  const t = useTranslations('Method')
  return (
    <div className="flex items-center justify-start mb-8">
      <h1 className="text-3xl font-normal leading-none">{ title }</h1>
      <Modal
        title={ title }
        activator={
          <button className="bg-primary/10 hover:bg-primary/20 transition-colors transition-duration-300 text-primary text-xs uppercase tracking-wide px-3 py-1.5 rounded-lg ml-4 cursor-pointer inline-flex items-center">
            <Info size={16} className="mr-2" />
            <span>{ t('more') }</span>
          </button>
        }
      >
        { children }
      </Modal>
    </div>
  )
}
