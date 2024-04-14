import { apiNew } from './../exam/api';
import request from "@/utils/request"
import { reqNewList, resRoot } from "./type"
import exp from "constants"

const urlHeader = '/api/paper'

// 删除试卷
export const apiDelete = (req: FormData) => {
  const res = request(urlHeader + '/delete', req)
  return res
}
// 添加试卷
export const apiNew = async (req: reqNewList) => {
  const res = await request(urlHeader + '/new', req)
  return res as resRoot<null>
}
// 添加试卷答案
export const apiNewAnswer = async (req: {
  examID: number
  img: string[]
}) => {
  const res = await request(urlHeader + '/na', req)
  return res as resRoot<null>
}