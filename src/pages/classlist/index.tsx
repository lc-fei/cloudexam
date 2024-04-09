import { Button, Card, Form, Input, Modal } from 'antd'
import styles from './index.module.scss'
import { useEffect, useState } from 'react'
import { apiAll, apiInfo, apiNew } from '@/api/class/api'
import { ResRoot, TeacherStudentData, allRes, infoRes } from '@/api/class/type'
import { msgError } from '@/utils/msg'

const { Meta } = Card
export const ClassList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [form] = Form.useForm()
  const [classIdList, setClassIdList] = useState<allRes>([])
  const [classInfoList, setClassInfoList] = useState<TeacherStudentData[]>()
  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const onFinish = async (values: { name: string }) => {
    if (localStorage.getItem('user')) {
      try {
        const user = JSON.parse(localStorage.getItem('user') as string)
        console.log('user', user)
        const req = { name: values.name, teacherId: parseInt(user.state.userinfo.uid) }
        const res = await apiNew(req)
        console.log('res', res)
        getNewClassInfo()
        handleCancel()
        form.resetFields()
      } catch (error) {
        msgError('新增班级失败')
      }
    } else {
      localStorage.removeItem('token')
      msgError('请先登录')
    }
  }

  const getNewClassInfo = async () => {
    const classIdRes = (await apiAll()) as ResRoot<allRes>
    const classIdList = classIdRes.data
    const classInfoRes = (await apiInfo(classIdList)) as ResRoot<infoRes>
    const classInfoObj = classInfoRes.data
    setClassIdList(classIdList)
    setClassInfoList(Object.values(classInfoObj))
    console.log('classInfoList', classInfoList)
    console.log('更新最新的班级数据')
  }

  useEffect(() => {
    getNewClassInfo()
  }, [])

  return (
    <>
      <div className={styles['classlist']}>
        <div className={styles['header']}>
          <Button type="primary" onClick={showModal}>
            新增班级
          </Button>
        </div>
        <div className={styles['content']}>
          {classInfoList?.map((item) => {
            return (
              <Card hoverable className={styles['mycard']}>
                <Meta title={item.Name} description={'班级号：' + item.ID} />
              </Card>
            )
          })}
        </div>
      </div>
      <Modal title="新增班级" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer="">
        <Form form={form} name="validateOnly" layout="vertical" autoComplete="off" onFinish={onFinish}>
          <Form.Item name="name" label="班级名称" rules={[{ required: true, message: '请输入班级名称!' }]}>
            <Input />
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
    </>
  )
}
