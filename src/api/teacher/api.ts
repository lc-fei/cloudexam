import request from "@/utils/request";
import { answerInfoType, resMission, resPart, resRoot, teacherExamInfoType } from "./type";

const urlHeader = '/api/seisei'

// 获取教师考试信息
export const apiIdList = async () => {
  const res = await request(urlHeader + '/ms/exam', {})
  return res as resRoot<teacherExamInfoType[]>
}

// 获取改卷任务
export const apiMission = async (req: FormData) => {
  const res = await request(urlHeader + '/mission', req)
  return res as resRoot<resMission>
}

// 获取全部改卷任务 按任务阅卷
export const apiPart = async (req: FormData) => {
  const res = await request(urlHeader + '/ms/part', req)
  return res as resRoot<resPart>
}

// 教师完成阅卷任务
export const apiFinish = async (req: FormData) => {
  const res = await request(urlHeader + '/ms/fm', req)
  return res as resRoot<null>
}

//为单卷打分
export const apiMark = async (req: FormData) => {
  const res = await request(urlHeader + '/mark', req)
  return res as resRoot<null>
}

//获取试卷答案    dsadas
export const apiAnswer = async (req: FormData) => {
  const res = await request(urlHeader + '/as', req)
  return res as resRoot<answerInfoType[]>
}