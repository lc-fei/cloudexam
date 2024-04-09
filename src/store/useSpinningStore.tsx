import { create } from 'zustand'

type useSpinningStore = {
  spinningStore: boolean
  setSpinningStore: (spinning: boolean) => void
}

export const useSpinningStore = create<useSpinningStore>()((set) => ({
  spinningStore: false,
  setSpinningStore: (spinning: boolean) => set(() => ({ spinningStore: spinning })),
}))
