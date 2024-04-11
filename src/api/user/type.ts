
export interface ResRoot<T> {
  code: number
  message: string
  data: T
}

// user
export interface LoginData {
  token: string
  user_info: UserInfoType
}

//new
export interface ReqNew {
  avatar: string
  captcha: string
  email: string
  name: string
  passWord: string
  role: number
  userName: string
}

//c
export type cRes = number[]

export interface UserInfoType {
  uid: string
  role: number
  name: string
  userName: string
  passWord: string
  avatar: string
  email: string
}