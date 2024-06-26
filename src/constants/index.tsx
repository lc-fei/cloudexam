import type { MenuProps } from 'antd'

export const getMenu = () => {
  const user = localStorage.getItem('user')
  const userObj = JSON.parse(user as string)
  const role = userObj.state.userinfo.role
  if (role === 1) {
    return [
      {
        label: '班级管理',
        key: '/classlist',
      },
    ]
  }
  if (role === 2) {
    return [
      {
        label: '班级管理',
        key: '/classlist',
      },
      {
        label: '教师阅卷',
        key: '/grandinglist',
      },
    ]
  }
  if (role === 3) {
    return [
      {
        label: '考试管理',
        key: '/exammanage',
      },
      {
        label: '班级管理',
        key: '/classlist',
      },
    ]
  }
}

// export const AdmMenu: MenuProps['items'] = [
//   {
//     label: '考试管理',
//     key: '/exammanage',
//   },
//   {
//     label: '班级管理',
//     key: '/classlist',
//   },
//   {
//     label: '教师阅卷',
//     key: '/grandinglist',
//   },
// ]

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
  student: 1 | 2 | 3
  teacher: 1 | 2 | 3
  admin: 1 | 2 | 3
} = {
  student: 1,
  teacher: 2,
  admin: 3,
}

export const examSt: {
  preparaing: 1 | 2 | 3 | 4
  sharing: 1 | 2 | 3 | 4
  marking: 1 | 2 | 3 | 4
  ended: 1 | 2 | 3 | 4
} = {
  preparaing: 1, // 等待设置考试配置
  sharing: 2, // 等待分发批改任务
  marking: 3, // 批改中
  ended: 4, // 批改完成
}

export const getexamSt = (num: number) => {
  const values = ['状态占位符', '等待设置考试配置', '等待分发批改任务', '批改中', '批改完成']
  return values[num] as string
}

type SubjectsType = '数学' | '物理' | '化学' | '生物' | '语文' | '英语' | '政治' | '历史' | '地理'
export const examSubjects: {
  math: SubjectsType
  chinese: SubjectsType
  english: SubjectsType
  physics: SubjectsType
  chemistry: SubjectsType
  biology: SubjectsType
  history: SubjectsType
  geography: SubjectsType
  politics: SubjectsType
} = {
  math: '数学',
  chinese: '语文',
  english: '英语',
  physics: '物理',
  chemistry: '化学',
  biology: '生物',
  history: '历史',
  geography: '地理',
  politics: '政治',
}
