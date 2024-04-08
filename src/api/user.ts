import request from "@/utils/request";
import { LoginData, ReqNew, ResRoot } from "./type";


const urlHead = '/api/user'

export const apiLogin = async (req: FormData) => {
  const res = await request(urlHead + '/login', req)
  return res as ResRoot<LoginData>
}


export const apiNew = async (req: ReqNew) => {
  req.avatar = 'https://may1145.oss-cn-chengdu.aliyuncs.com/img/202404072021762.png'
  console.log('reqnew', req)
  const res = await request(urlHead + '/new', req)
  return res as ResRoot<null>
}

export const apiVerify = async (req: FormData) => {
  const res = await request(urlHead + '/verify', req)
  return res as ResRoot<null>
}

export const apiCheck = async (req: FormData) => {
  const res = await request(urlHead + '/check', req)
  return res as ResRoot<null>
}