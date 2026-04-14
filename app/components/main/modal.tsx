'use client'

import React, { useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import {useTranslations} from "next-intl";

interface ModalProps {
  activator: React.ReactNode;
  children: React.ReactNode;
  content?: string;
  title?: string
}

export default function Modal({ activator, content, title, children }: ModalProps) {
  const [open, setOpen] = useState(false)
  const t = useTranslations('Common')
  return (
    <>
      <div onClick={() => setOpen(true)}>
        {activator}
      </div>
      <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-900/50 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-primary-100 text-left shadow-xl outline -outline-offset-1 outline-primary/10 transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
            >
              <div className="bg-primary-100 pe-0 ps-4 pt-5 sm:p-6 sm:pe-0">
                <div className="text-left">
                  {
                    title &&
                    <DialogTitle as="h3" className="text-2xl font-semibold text-white pe-4 mb-4">
                      {title}
                    </DialogTitle>
                  }
                  <div className="pb-14 pe-4 overflow-y-auto max-h-[70vh]">
                    {
                      children ||
                      <p className="text-base text-gray-400">{ content }</p>
                    }
                  </div>
                </div>
              </div>
              <div className="bg-primary/5 backdrop-blur-sm px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 absolute bottom-0 left-0 right-0">
                <button
                  type="button"
                  data-autofocus
                  onClick={() => setOpen(false)}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white/10 cursor-pointer px-6 py-1.5 font-normal text-white inset-ring inset-ring-white/5 hover:bg-white/20 sm:mt-0 sm:w-auto text-base transition-colors duration-300 ease-in-out"
                >
                  { t('close') }
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  )
}
