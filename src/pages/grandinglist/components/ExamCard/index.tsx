import { Tag, Tooltip } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './index.module.scss'
import { getexamSt } from '@/constants'

export const ExamCardTitle = ({ state, name, id }) => {
  // * 调tag和title的间距
  const navigator = useNavigate()
  return (
    <div className={styles['examCardTitle']}>
      <Tag color={'red'} className={styles['examCardTitle__tag']}>
        {getexamSt(state)}
      </Tag>
      <Tooltip placement="top" title={`考试ID: ${id}`} className={styles['examCardTitle__title']}>
        <h2
          onClick={(e) => {
            console.log('Navigating to:', `/grandinglist/exammark/${id}`)
            navigator(`/grandinglist/exammark/${id}`, { replace: true })
            e.stopPropagation()
          }}
        >
          {name}
        </h2>
      </Tooltip>
    </div>
  )
}

export const ExamCardDescription = ({ createTime, subjects }) => {
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
  return (
    <div>
      <span>{timestampToDateFormat(createTime)}</span>
      <span> | </span>
      <span>{subjects}</span>
    </div>
  )
}
