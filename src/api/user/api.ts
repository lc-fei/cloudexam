import request from "@/utils/request";
import { LoginData, ReqNew, ResRoot, cRes } from "./type";


const urlHead = '/api/user'
// 登录
export const apiLogin = async (req: FormData) => {
  const res = await request(urlHead + '/login', req)
  return res as ResRoot<LoginData>
}

// 注册
export const apiNew = async (req: ReqNew) => {
  req.avatar = 'https://may1145.oss-cn-chengdu.aliyuncs.com/img/202404072021762.png'
  console.log('reqnew', req)
  const res = await request(urlHead + '/new', req)
  return res as ResRoot<null>
}

// 获取验证码
export const apiVerify = async (req: FormData) => {
  const res = await request(urlHead + '/verify', req)
  return res as ResRoot<null>
}
// 验证用户名单一性
export const apiCheck = async (req: FormData) => {
  const res = await request(urlHead + '/check', req)
  return res as ResRoot<null>
}

// 获取用户所在班级ID
export const apiC = async () => {
  const res = await request(urlHead + '/c', {})
  return res as ResRoot<cRes>
}