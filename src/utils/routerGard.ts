import { userPms } from "@/constants";
import { msgError } from "./msg";

export const checkStudent = (navigate) => {
  const userJson = localStorage.getItem('user')
  if (!userJson) {
    msgError('请先登录')
    localStorage.removeItem('token')
    navigate('/login')
  }
  else {
    const user = JSON.parse(userJson)
    if (user.state.userinfo.role !== userPms.student) {
      msgError('你不是老师，无权访问此界面')
      navigate('../')
    }
  }
}

export const checkTeacher = (navigate) => {
  const userJson = localStorage.getItem('user')
  if (!userJson) {
    msgError('请先登录')
    localStorage.removeItem('token')
    navigate('/login')
  }
  else {
    const user = JSON.parse(userJson)
    if (user.state.userinfo.role !== userPms.teacher) {
      msgError('你不是老师，无权访问此界面')
      navigate('../')
    }
  }
}
export const checkAdmin = (navigate) => {
  const userJson = localStorage.getItem('user')
  if (!userJson) {
    msgError('请先登录')
    localStorage.removeItem('token')
    navigate('/login')
  }
  else {
    const user = JSON.parse(userJson)
    if (user.state.userinfo.role !== userPms.admin) {
      msgError('你不是管理员，无权访问此界面')
      navigate('../')
    }
  }
}