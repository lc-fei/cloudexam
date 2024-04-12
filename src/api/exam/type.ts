import exp from "constants"

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

export type resInfo = {
  [key: string]: ExamInfoType
}

export type ExamInfoType = {
  id: number
  paperID: number
  state: number
  name: string
  desc: string
  subjects: string
  createTime: number
  classIDs: number[]
}

