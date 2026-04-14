'use client'

import {createCheckinStore} from "@/stores/checkin-store";
import {ReactNode, useState, createContext, useContext} from "react";
import {useStore} from "zustand/react";

type CheckinStoreApi = ReturnType<typeof createCheckinStore>

const CheckinStoreContext = createContext<CheckinStoreApi | undefined>(undefined)

export const CheckinStoreProvider = ({ children }: { children: ReactNode }) => {
  const [store] = useState(() => createCheckinStore())
  return (
    <CheckinStoreContext.Provider value={store}>
      { children }
    </CheckinStoreContext.Provider>
  )
}

export const useCheckinStore = <T,>(
  selector: (state: CheckinStore) => T
): T => {
  const checkinStoreContext = useContext(CheckinStoreContext)
  if (!checkinStoreContext) {
    throw new Error('useCheckinStore must be used within a CheckinStoreProvider')
  }
  return useStore(checkinStoreContext, selector)
}
