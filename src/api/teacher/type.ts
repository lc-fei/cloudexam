export type resRoot<T> = {
  code: number,
  message: string,
  data: T
}

// 教师考试信息
export type teacherExamInfoType = {
  id: number
  createTime: number
  state: number
  name: string
  desc: string
  subjects: string
}
// mission返回数据类型
export type resMission = {
  ExamID: string,
  Start: number,
  End: number
}

export type resPart = markInfoType[]
export type markInfoType = {
  OffSet: number
  Mark: number
  MaxMark: number
  State: number
  ID: number
  ExamID: number
  PaperID: number
  Img: string
  Text: string
}


export type answerInfoType = {
  ID: number,
  examID: number,
  offset: number,
  img: string
}