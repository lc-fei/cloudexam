import request from "@/utils/request"
import { allRes, infoRes, newReq, newRes, ResRoot } from "./type"

const urlHeader = '/api/c'
export const apiNew = async (req: newReq) => {
  const res = await request(urlHeader + '/new', req)
  return res as ResRoot<newRes>
}
export const apiAll = async () => {
  const res = await request(urlHeader + '/all', {})
  return res as ResRoot<allRes>
}

export const apiInfo = async (req: number[]) => {
  const res = await request(urlHeader + '/info', req)
  return res as ResRoot<infoRes>
}
export const apiAdd = async () => {
  const res = await request(urlHeader + '/add', {})
  return res
}
