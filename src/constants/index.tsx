import type { MenuProps } from 'antd'
export const TchMenu: MenuProps['items'] = [
  {
    label: '考试列表',
    key: '/examlist',
  },
  {
    label: '教师阅卷',
    key: '/grandinglist',
  },
]

export const AdmMenu: MenuProps['items'] = [
  {
    label: '考试管理',
    key: '/exammanage',
  },
  {
    label: '班级管理',
    key: '/classlist',
  },
  {
    label: '考试列表',
    key: '/examlist',
  },
  {
    label: '教师阅卷',
    key: '/grandinglist',
  },
]

export const DropDownMenu: MenuProps['items'] = [
  // {
  //   key: 'changepwd',
  //   label: <div>修改信息</div>,
  // },
  {
    key: 'logout',
    label: <div>退出登录</div>,
  },
]

export const userPms: {
  student: number
  teacher: number
  admin: number
} = {
  student: 1,
  teacher: 2,
  admin: 3,
}
