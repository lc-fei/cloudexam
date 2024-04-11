export interface resRoot<T> {
  code: number
  data: T
  message: string
}

export interface reqNew {
  desc: string
  name: string
  state: number
  subjects: string
}
export type resAll = number[]

