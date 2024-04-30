import { List, Radio } from 'antd'
import { ExamCardDescription, ExamCardTitle } from './components/ExamCard'
import styles from './index.module.scss'
import { apiIdList } from '@/api/teacher/api'
import { useEffect, useState } from 'react'
import { teacherExamInfoType } from '@/api/teacher/type'
import { checkTeacher } from '@/utils/routerGard'
import { useNavigate } from 'react-router-dom'

export const GrandingList = () => {
  const [examList, setExamList] = useState<teacherExamInfoType[] | undefined>(undefined)
  const navigate = useNavigate()
  useEffect(() => {
    checkTeacher(navigate)
    getExamInfoList()
  }, [])
  const getExamInfoList = async () => {
    const examInfoRes = await apiIdList()
    setExamList(examInfoRes.data)
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
              key={item.id}
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
