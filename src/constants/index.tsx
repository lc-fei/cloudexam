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
    label: '教师管理',
    key: '/tchmanage',
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
  {
    key: 'changepwd',
    label: <div>修改密码</div>,
  },
  {
    key: 'logout',
    label: <div>退出登录</div>,
  },
]
