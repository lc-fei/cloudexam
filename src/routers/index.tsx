import { ClassList } from '@/pages/classlist'
import { ExamList } from '../pages/examlist'
import { GradeList } from '../pages/examlist/pages/grade'
import { ExamManage } from '../pages/exammanage'
import { ExamManagementById } from '../pages/exammanage/pages/management'
import { HomePage } from '../pages/home'
import { Login } from '../pages/login'
import { Register } from '../pages/register'
import path from 'path'
import { ClassListInfo } from '@/pages/classlist/pages/classlistinfo'

export const routes = [
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/',
    element: <HomePage />,
    children: [
      {
        path: '/exammanage',
        element: <ExamManage />,
      },
      {
        path: '/exammanage/management/:id',
        element: <ExamManagementById />,
      },
      {
        path: '/classlist',
        element: <ClassList />,
      },
      {
        path: '/classlist/detail/:id',
        element: <ClassListInfo />,
      },
      {
        path: '/examlist',
        element: <ExamList />,
      },
      {
        path: '/examlist/gradelist/:id',
        element: <GradeList />,
      },
      {
        path: '/grandinglist',
        element: <GradeList />,
      },
    ],
  },
  {
    path: '/stulogin',
    element: <div>STULogin Page</div>,
  },
  {
    path: '/tchlogin',
    element: <div>TCHLogin Page</div>,
  },

  {
    path: '/register',
    element: <div>Register Page</div>,
  },
  {
    path: '*',
    element: <div>404 Not Found</div>,
  },
]
