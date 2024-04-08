import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

type UserInfo = {
  uid: string
  role: number
  name: string
  userName: string
  passWord: string
  avatar: string
  email: string
} | null
type UserInfoStore = {
  userinfo: UserInfo
  setUserInfo: (userinfo: UserInfo) => void
}

export const useUserStore = create<UserInfoStore>()(
  persist(
    (set) => ({
      userinfo: null,
      setUserInfo: (userinfo: UserInfo) => {
        set({ userinfo })
      },
    }),
    {
      name: 'user',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
