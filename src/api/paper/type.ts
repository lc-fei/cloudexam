export interface resRoot<T> {
  code: number
  data: T
  message: string
}

export type reqNewList = reqNew[]
export interface reqNew {
  examID: number
  imgs: string[]
  maxMark: number[]
  ownerID: number
}
