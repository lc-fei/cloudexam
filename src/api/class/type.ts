export type newReq = {
  name: string
  teacherID: number
}
export type ResRoot<T> = {
  code: number
  message: string
  data: T
}

export type newRes = {
  token: string
}

export type allRes = number[]

export type infoRes = {
  [key: string]: TeacherStudentData;
}

export type TeacherStudentData = {
  ID: number;
  Name: string;
  TeacherIDs: number[] | null;
  StudentIDs: number[] | null;
  Code: string
};

