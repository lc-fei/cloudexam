import { Button, Input, List, Modal, Select, Form } from 'antd'
import { ExamCardMTags, ExamCardMTitle } from './components/ExamCard'
import styles from './index.module.scss'
import { useUserStore } from '@/store/useUserStore'
import { examSubjects, userPms } from '@/constants'
import { useState, useEffect } from 'react'
import TextArea from 'antd/es/input/TextArea'
import { ExamInfoType, reqNew, resAll, resInfo, resRoot } from '@/api/exam/type'
import { apiAll, apiInfoExam, apiNew } from '@/api/exam/api'
import { useSpinningStore } from '@/store/useSpinningStore'
import { msgSuccess } from '@/utils/msg'
import { checkAdmin } from '@/utils/routerGard'
import { useNavigate } from 'react-router-dom'
export const ExamManage = () => {
  const navigate = useNavigate()
  const [examInfoList, setExamInfoList] = useState<ExamInfoType[] | undefined>(undefined)
  const { userinfo } = useUserStore()
  const { setSpinningStore } = useSpinningStore()
  const [form] = Form.useForm()
  const addExam = () => {
    setIsModalOpen(true)
    console.log('add exam')
  }
  const [isModalOpen, setIsModalOpen] = useState(false)

  // 添加考试
  const onFinish = async (values: reqNew) => {
    setSpinningStore(true)
    const res = await apiNew(values)
    console.log('res', res)
    setIsModalOpen(false)
    form.resetFields()
    await updateExamInfoList()
    msgSuccess('添加成功')
    setSpinningStore(false)
  }

  // 更新考试列表
  const updateExamInfoList = async () => {
    setSpinningStore(true)
    const allRes: resRoot<resAll> = await apiAll()
    const examIdList = allRes.data
    if (!examIdList) {
      setExamInfoList([])
    } else {
      const infoRes: resRoot<resInfo> = await apiInfoExam(examIdList)
      const infoObj = infoRes.data
      setExamInfoList(Object.values(infoObj))
    }
    setSpinningStore(false)
  }

  //
  const handleCancel = () => {
    setIsModalOpen(false)
    form.resetFields()
  }

  useEffect(() => {
    checkAdmin(navigate)
    updateExamInfoList()
  }, [])
  return (
    <div>
      <div className={styles['head-actions']}>
        <Select
          defaultValue={'all'}
          options={[
            { value: 'all', label: '考试时间' },
            { value: '2024', label: '2024' },
            { value: '2023', label: '2023' },
            { value: '2022', label: '2022' },
            { value: '2021', label: '2021' },
            { value: '2020', label: '2020' },
            { value: '2019', label: '2019' },
            { value: '2018', label: '2018' },
          ]}
        />
        <Select
          defaultValue={1}
          options={[
            { value: 1, label: '待管理员设置考试配置' },
            { value: 2, label: '待管理员分发批改任务' },
            { value: 3, label: '老师批改中' },
            { value: 4, label: '批改完成' },
          ]}
        />
        {userinfo?.role === userPms.admin && (
          <Button type="primary" onClick={addExam}>
            添加考试
          </Button>
        )}
      </div>
      <div className={styles['exam-list']}>
        <List
          bordered
          pagination={{
            position: 'bottom',
            align: 'center',
            size: 'default',
            pageSize: 6,
            showQuickJumper: true,
            showSizeChanger: false,
            showTotal: (total) => `共 ${total} 条数据`,
          }}
          dataSource={examInfoList}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta title={<ExamCardMTitle {...item} />} description={<ExamCardMTags {...item} />}></List.Item.Meta>
            </List.Item>
          )}
        ></List>
      </div>
      <Modal title="添加考试" open={isModalOpen} onCancel={handleCancel} footer="">
        <Form form={form} name="newClass" layout="vertical" autoComplete="off" onFinish={onFinish}>
          <Form.Item name="name" label="考试名称" rules={[{ required: true, message: '请输入考试名称!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="subjects" label="考试科目" rules={[{ required: true, message: '请选择考试科目' }]}>
            <Select>
              {Object.entries(examSubjects).map(([key, value]) => (
                <Select.Option key={key} value={value}>
                  {value}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="desc" label="考试描述" rules={[{ required: true, message: '请输入考试描述!' }]}>
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item>
            <Button style={{ marginRight: 8 }} onClick={handleCancel}>
              取消
            </Button>
            <Button type="primary" htmlType="submit" className="login-form-button">
              确定
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
