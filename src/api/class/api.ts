import request from "@/utils/request"
import { allRes, infoRes, newReq, newRes, ResRoot } from "./type"


const urlHeader = '/api/c'
// 创建新班级
export const apiNew = async (req: newReq) => {
  const res = await request(urlHeader + '/new', req)
  return res as ResRoot<newRes>
}
// 获取所有班级ID
export const apiAll = async () => {
  const res = await request(urlHeader + '/all', {})
  return res as ResRoot<allRes>
}
// 获取班级信息
export const apiInfo = async (req: number[]) => {
  const res = await request(urlHeader + '/info', req)
  return res as ResRoot<infoRes>
}
// 加入班级
export const apiAdd = async (req: FormData) => {
  const res = await request(urlHeader + '/mg/add', req)
  return res as ResRoot<null>
}

// 离开班级
export const apiQuit = async (req: FormData) => {
  const res = await request(urlHeader + '/mg/quit', req)
  return res as ResRoot<null>
}

export const apiClear = async (req: FormData) => {
  const res = await request(urlHeader + '/mg/clear', req)
  return res as ResRoot<null>
}
