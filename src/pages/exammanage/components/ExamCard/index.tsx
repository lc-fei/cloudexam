import { Tag } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useBreadRouterStore } from '../../../../store/useBreadRouterStore'
import styles from './index.module.scss'
import { ExamInfoType } from '@/api/exam/type'

export const ExamCardMTitle = ({ examID, name, subjects, createTime }: ExamInfoType) => {
  function timestampToDateFormat(timestampInSeconds) {
    // 将秒转换为毫秒
    const timestampInMilliseconds = timestampInSeconds * 1000
    // 创建Date对象
    const date = new Date(timestampInMilliseconds)
    // 获取年、月、日
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0') // 月份从0开始，所以要+1
    const day = String(date.getDate()).padStart(2, '0') // 使用padStart确保总是两位数

    // 拼接成年-月-日的格式
    return `${year}-${month}-${day}`
  }
  const navigator = useNavigate()
  const pushrouter = useBreadRouterStore((state) => state.pushrouter)
  return (
    <div className={styles['manage-exam-card-title']}>
      <div
        className={styles['title-content']}
        onClick={() => {
          pushrouter({ title: name, path: `/exammanage/management/${examID}` })
          navigator(`/exammanage/management/${examID}`)
        }}
      >
        <h2>{name}</h2>
      </div>
      <span>{timestampToDateFormat(createTime)}</span> | <span>{subjects}</span> | <span>考试ID：{examID}</span>
    </div>
  )
}

export const ExamCardMTags = ({ state }: ExamInfoType) => {
  const options = { 0: '测试、后期删除', 1: '待管理员设置考试配置', 2: '待管理员分发批改任务', 3: '老师批改中', 4: '批改完成' }

  return (
    <div className={styles['tags']}>
      {state === 4 && <Tag color="blue">{options[state]}</Tag>}
      {state !== 4 && <Tag color="error">{options[state]}</Tag>}
    </div>
  )
}
