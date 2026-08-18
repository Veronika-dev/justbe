import {useTranslations} from "next-intl";
import ExercisesHeader from "@/components/exercises/header";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import {memo} from "react";
import BreathingSelector from "@/components/exercises/breathing/selector";
import {breathingTypes} from "@/lib/variables";

export default function Breathing() {
  const t = useTranslations('Method')

  return (
    <div className="container mx-auto px-10 py-8">
      <ExercisesHeader title={ t('breathing') }>
        <BreathingReadMore />
      </ExercisesHeader>
      <BreathingSelector />
      <p className="text-sm text-gray-500 mt-4">
        <a href={"https://www.bhf.org.uk/informationsupport/heart-matters-magazine/wellbeing/breathing-exercises"}
           target="_blank"
        >
          {t('source')}: British Heart Foundation
        </a>
      </p>
    </div>
  );
}


const BreathingReadMore = memo(function BreathingReadMore() {
  const t = useTranslations('Method.breathingTypes')
  return (
    <div className="w-full">
      <TabGroup>
        <TabList className="flex gap-4">
          {breathingTypes.map((name: BreatingType) => (
            <Tab
              key={name}
              className="rounded-full px-3 py-1 text-sm/6 font-semibold focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-white/5 data-selected:bg-white/10 data-selected:data-hover:bg-white/10"
            >
              { t(name) }
            </Tab>
          ))}
        </TabList>
        <TabPanels className="mt-3">
          {breathingTypes.map((name: BreatingType) => (
            <TabPanel key={name} className="rounded-xl bg-white/5 p-3">
              <p className="text-base text-tx-primary whitespace-pre-line">
                { t(`${name}Description`) }
              </p>
            </TabPanel>
          ))}
        </TabPanels>
      </TabGroup>
    </div>
  )
})
