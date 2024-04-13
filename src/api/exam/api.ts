import request from '@/utils/request';
import { ExamInfoType, reqNew, reqPlan, resAll, resInfo, resRoot } from './type';

const urlHeader = '/api/exam'

// 添加考试
export const apiNew = async (req: reqNew) => {
  req.state = 1
  console.log('req', req)
  const res = await request(urlHeader + '/new', req)
  return res as resRoot<null>
}

// 获取所有考试id
export const apiAll = async () => {
  const res = await request(urlHeader + '/all', {})
  return res as resRoot<resAll>
}

// 获取考试信息
export const apiInfoExam = async (req: number[]) => {
  const res = await request(urlHeader + '/info', req)
  return res as resRoot<resInfo>
}

// 删除考试
export const apiDelete = async (req: FormData) => {
  const res = await request(urlHeader + '/delete', req)
  return res as resRoot<null>
}

// 修改考试信息
export const apiRe = async (req: ExamInfoType) => {
  const res = await request(urlHeader + '/re', req)
  return res as resRoot<null>
}

// 班级加入考试
export const apiJoin = async (req: FormData) => {
  const res = await request(urlHeader + '/mg/join', req)
  return res as resRoot<null>
}

// 班级退出考试
export const apiQuit = async (req: FormData) => {
  const res = await request(urlHeader + '/mg/quit', req)
  return res as resRoot<null>
}

// 切片
export const apiPlan = async (req: reqPlan) => {
  const res = await request(urlHeader + '/mg/plan', req)
  return res as resRoot<null>
}

