import { Button, Card, Form, Input, Modal } from 'antd'
import styles from './index.module.scss'
import { useEffect, useState } from 'react'
import { apiAdd, apiAll, apiInfo, apiNew } from '@/api/class/api'
import { ResRoot, TeacherStudentData, allRes, infoRes } from '@/api/class/type'
import { msgError, msgSuccess } from '@/utils/msg'
import { useNavigate } from 'react-router-dom'
import { useSpinningStore } from '@/store/useSpinningStore'
import { useUserStore } from '@/store/useUserStore'
import Meta from 'antd/es/card/Meta'
import { userPms } from '@/constants'
import { apiC } from '@/api/user/api'
import { cRes } from '@/api/user/type'

export const ClassList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isModalOpenAdd, setIsModalOpenAdd] = useState(false)
  const [form] = Form.useForm()
  const [formAdd] = Form.useForm()
  const [classInfoList, setClassInfoList] = useState<TeacherStudentData[]>()
  const navagate = useNavigate()
  const { setSpinningStore } = useSpinningStore()
  const { userinfo } = useUserStore()
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
        const req = { name: values.name, teacherID: parseInt(user.state.userinfo.uid) }
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
      navagate('/login')
    }
  }

  // 加入班级
  const showModalAdd = () => {
    setIsModalOpenAdd(true)
  }
  const handleOkAdd = () => {
    setIsModalOpenAdd(false)
  }
  const handleCancelAdd = () => {
    setIsModalOpenAdd(false)
  }

  // 加入班级
  const onFinishAdd = async (values: { classToken: string }) => {
    if (localStorage.getItem('user')) {
      try {
        const req = new FormData()
        req.append('classToken', values.classToken)
        const res = await apiAdd(req)
        if (res.code === 200) {
          getNewClassInfo()
          handleCancelAdd()
          formAdd.resetFields()
          msgSuccess('加入班级成功')
        } else if (res.code === 500) {
          msgError('邀请码错误')
          return
        }
      } catch (error) {
        msgError('加入班级失败')
      }
    } else {
      localStorage.removeItem('token')
      msgError('请先登录')
      navagate('/login')
    }
  }
  // 获取最新班级信息
  const getNewClassInfo = async () => {
    setSpinningStore(true)
    let classIdRes
    if (userinfo?.role === userPms.admin) {
      classIdRes = (await apiAll()) as ResRoot<allRes>
    } else {
      classIdRes = (await apiC()) as ResRoot<cRes>
    }
    if (classIdRes.data === null) {
      setClassInfoList([])
      setSpinningStore(false)
      return
    }
    const classIdList = classIdRes.data
    const classInfoRes = (await apiInfo(classIdList)) as ResRoot<infoRes>
    const classInfoObj = classInfoRes.data
    setClassInfoList(Object.values(classInfoObj))
    console.log('classInfoList', classInfoList)
    console.log('更新最新的班级数据')
    setSpinningStore(false)
  }

  useEffect(() => {
    getNewClassInfo()
  }, [])

  return (
    <>
      <div className={styles['classlist']}>
        <div className={styles['header']}>
          <Button type="primary" onClick={showModalAdd} style={{ marginRight: 8 }}>
            加入班级
          </Button>
          {userinfo?.role === userPms.teacher || userinfo?.role === userPms.admin ? (
            <Button type="primary" onClick={showModal}>
              新增班级
            </Button>
          ) : null}
        </div>
        <div className={styles['content']}>
          {classInfoList?.map((item) => {
            return (
              <div key={item.ID}>
                <Card
                  hoverable
                  className={styles['mycard']}
                  onClick={() => {
                    navagate('/classlist/detail/' + item.ID)
                  }}
                >
                  <Meta title={item.Name} description={'班级号：' + item.Code + '  |  id：' + item.ID} />
                </Card>
              </div>
            )
          })}
        </div>
      </div>
      <Modal title="新增班级" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer="">
        <Form form={form} name="newClass" layout="vertical" autoComplete="off" onFinish={onFinish}>
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
      <Modal title="加入班级" open={isModalOpenAdd} onOk={handleOkAdd} onCancel={handleCancelAdd} footer="">
        <Form form={formAdd} name="addClass" layout="vertical" autoComplete="off" onFinish={onFinishAdd}>
          <Form.Item name="classToken" label="班级邀请码" rules={[{ required: true, message: '请输入班级邀请码!' }]}>
            <Input />
          </Form.Item>
          <Form.Item>
            <Button style={{ marginRight: 8 }} onClick={handleCancelAdd}>
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
