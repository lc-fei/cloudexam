import request from "@/utils/request"
import { resRoot } from "./type"
const urlHeader = '/api'



// 上传试卷
export const apiUploadPaper = async (req: FormData) => {
  req.append('type', 'paper')
  const res = await request(urlHeader + '/upload', req)
  return res as resRoot<string>
}

// 上传答案
export const apiUploadAnswer = async (req: FormData) => {
  req.append('type', 'answer')
  const res = await request(urlHeader + '/upload', req)
  return res as resRoot<string>
}