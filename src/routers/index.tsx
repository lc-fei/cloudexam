import { ClassList } from '@/pages/classlist'
// import { ExamList } from '../pages/examlist'
import { ExamManage } from '../pages/exammanage'
import { ExamManagementById } from '../pages/exammanage/pages/management'
import { HomePage } from '../pages/home'
import { Login } from '../pages/login'
import { Register } from '../pages/register'
import { ClassListInfo } from '@/pages/classlist/pages/classlistinfo'
import { Navigate } from 'react-router-dom'
import { GrandingList } from '@/pages/grandinglist'
import { ExamMark } from '@/pages/grandinglist/page/exammark'

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
        path: '/',
        element: <Navigate to="/exammanage" />,
      },
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
        path: '/grandinglist',
        element: <GrandingList />,
      },
      {
        path: '/grandinglist/exammark/:id',
        element: <ExamMark />,
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
