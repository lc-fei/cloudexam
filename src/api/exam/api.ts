import request from '@/utils/request';
import { reqNew, resAll, resInfo, resRoot } from './type';

const urlHeader = '/api/exam'

// 添加考试
export const apiNew = async (req: reqNew) => {
  req.state = 1
  const res = await request(urlHeader + '/new', req)
  return res as resRoot<null>
}

// 获取所有考试id
export const apiAll = async () => {
  const res = await request(urlHeader + '/all', {})
  return res as resRoot<resAll>
}

export const apiInfo = async (req: number[]) => {
  const res = await request(urlHeader + '/info', req)
  return res as resRoot<resInfo>
}
