import { useParams } from 'react-router-dom'
import styles from './index.module.scss'
import { useEffect, useState } from 'react'
import { TeacherStudentData } from '@/api/class/type'
import { apiInfo } from '@/api/class/api'
import { useNavigate } from 'react-router-dom'
import { msgError } from '@/utils/msg'
export const ClassListInfo = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [classInfo, setClassInfo] = useState<TeacherStudentData>({})
  const getClassInfo = async () => {
    const res = await apiInfo([parseInt(id as string)])
    setClassInfo(res.data[id as string])
  }
  useEffect(() => {
    if (!id) {
      navigate('/classlist')
      msgError('出错，请重试')
    } else {
      getClassInfo()
    }
  }, [])
  return (
    <>
      <div className={styles['classlistinfo']}>{classInfo.ID}</div>
    </>
  )
}
