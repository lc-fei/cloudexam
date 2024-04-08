import { create } from 'zustand'

type TRouterItem = {
  title: string
  path: string
}
type TBreadRouterStore = {
  routers: TRouterItem[]
  pushrouter: (router: TRouterItem) => void
  poprouter: () => void
  clearrouters: () => void
}

export const useBreadRouterStore = create<TBreadRouterStore>()((set) => ({
  routers: [],
  pushrouter: (router: TRouterItem) => set((state) => ({ routers: [...state.routers, router] })),
  poprouter: () => set((state) => ({ routers: state.routers.slice(0, -1) })),
  clearrouters: () => set(() => ({ routers: [] })),
}))
