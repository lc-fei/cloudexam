import { List, Radio } from 'antd'
import { ExamCardDescription, ExamCardTitle } from './components/ExamCard'
import styles from './index.module.scss'
import { apiIdList } from '@/api/teacher/api'
import { apiInfoExam } from '@/api/exam/api'
import { useEffect, useState } from 'react'
import { ExamInfoType } from '@/api/exam/type'

export const GrandingList = () => {
  const [examList, setExamList] = useState<ExamInfoType[] | undefined>(undefined)

  useEffect(() => {
    getExamInfoList()
  }, [])
  const getExamInfoList = async () => {
    const idRes = await apiIdList()
    const examIdList = idRes.data
    const examList = await apiInfoExam(examIdList)
    setExamList(examList.data)
  }
  return (
    <>
      {/* 头部操作 */}
      <div className={styles['exam-list-header']}>
        <div className={styles['radio-group']}>
          <Radio.Group buttonStyle="solid">
            <Radio.Button value={'all'}>全部</Radio.Button>
            <Radio.Button value={'inprocess'}>进行中</Radio.Button>
            <Radio.Button value={'finished'}>已结束</Radio.Button>
          </Radio.Group>
        </div>
      </div>
      {/* 列表 */}

      <div className="exam-list">
        <List
          bordered
          pagination={{
            position: 'bottom',
            align: 'center',
            size: 'default',
            pageSize: 6,
            showQuickJumper: true,
            showSizeChanger: false,
            showTotal: (total) => `共 ${total} 条`,
          }}
          dataSource={examList}
          renderItem={(item) => (
            <List.Item
              key={item.examID}
              style={{
                marginBottom: '10px',
              }}
            >
              <List.Item.Meta title={<ExamCardTitle {...item} />} description={<ExamCardDescription {...item} />}></List.Item.Meta>
            </List.Item>
          )}
        ></List>
      </div>
    </>
  )
}
