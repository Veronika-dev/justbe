import {Listbox, ListboxButton, ListboxOptions, ListboxOption} from '@headlessui/react'
import { ChevronDown, Check } from 'lucide-react'

export default function ChooseBreathingType<T extends string>({ list, value, setValue }: {
  list: ChooseItem<T>[], value: T, setValue: (type: T) => void
}) {
  const currentValue = list.find((it) => it.id === value)
  return (
    <Listbox value={value} onChange={setValue}>
      <ListboxButton
        className="relative w-full sm:w-60 rounded-lg border border-primary/30 py-1.5 pr-8 pl-3 text-left text-sm/6 text-white focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25"
      >
        { currentValue?.title }
        <ChevronDown
          className="pointer-events-none absolute top-2.5 right-2.5"
          size={16}
          aria-hidden="true"
        />
      </ListboxButton>
      <ListboxOptions
        anchor="bottom"
        transition
        className="w-(--button-width) rounded-lg border border-primary/10 bg-primary-100 p-1 focus:outline-none transition duration-100 ease-in data-leave:data-closed:opacity-0"
      >
        {list.map((item) => (
          <ListboxOption
            key={item.id}
            value={item.id}
            className="group flex cursor-default items-center gap-2 rounded-lg px-3 py-1.5 select-none data-focus:bg-white/10"
          >
            <Check className="invisible group-data-selected:visible" size={16} />
            <div className="text-sm/6 text-white">{ item.title }</div>
          </ListboxOption>
        ))}
      </ListboxOptions>
    </Listbox>
  )
}
