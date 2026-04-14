import { createStore } from "zustand/vanilla";
import { devtools } from 'zustand/middleware'

const defaultState: CheckinState = {
  currentResult: null,
}

export const createCheckinStore = (initState: CheckinState = defaultState) => {
  return createStore<CheckinStore>()(
    devtools(
      (set) => ({
        ...initState,
        setCurrentResult: (result: CheckInResult | null) => set({ currentResult: result }),
      }),
      { name: 'CheckinStore' }
    )
  )
};
