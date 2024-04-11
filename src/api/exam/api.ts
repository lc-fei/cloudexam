import request from '@/utils/request';
import { reqNew, resAll, resRoot } from './type';

const urlHeader = '/api/exam'

export const apiNew = async (req: reqNew) => {
  const res = await request(urlHeader + '/new', req)
  return res as resRoot<null>
}

export const apiAll = async () => {
  const res = await request(urlHeader + '/all', {})
  return res as resRoot<resAll>
}
