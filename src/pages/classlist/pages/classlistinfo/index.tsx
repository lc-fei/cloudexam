import { useParams } from 'react-router-dom'
import styles from './index.module.scss'
import { useEffect, useState } from 'react'
import { TeacherStudentData } from '@/api/class/type'
import { apiClear, apiInfo, apiQuit } from '@/api/class/api'
import { useNavigate } from 'react-router-dom'
import { msgError, msgSuccess } from '@/utils/msg'
import { Button, Modal, Table, Tag } from 'antd'
import Column from 'antd/es/table/Column'
import { apiList } from '@/api/user/api'
import { UserInfoType } from '@/api/user/type'
import { userPms } from '@/constants'
import { useUserStore } from '@/store/useUserStore'
import { resRoot } from '@/api/exam/type'
import { useSpinningStore } from '@/store/useSpinningStore'
import { ClassEchartsLine } from './components/classechartsline'
import { ClassEchartsCircle } from './components/classchartscircle'
export const ClassListInfo = () => {
  const { userinfo } = useUserStore()
  const { setSpinningStore } = useSpinningStore()
  const { id } = useParams()
  const navigate = useNavigate()
  const [classInfo, setClassInfo] = useState<TeacherStudentData | null>(null) // 班级信息
  const [userInfoState, setUserInfoState] = useState<UserInfoType[] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
  const [thisUserId, setThisUserId] = useState<string>('-1')
  const [isModalOpenDeleteClass, setIsModalOpenDeleteClass] = useState(false)
  const getClassInfo = async () => {
    setSpinningStore(true)
    const res = await apiInfo([parseInt(id as string)])
    const info: TeacherStudentData = res.data[id as string]
    setClassInfo(info)
    console.log('info', info)
    await upDateUserInfoState(info.TeacherIDs, info.StudentIDs)
    setSpinningStore(false)
  }
  // 获取班级成员信息
  const upDateUserInfoState = async (TeacherIDs: number[] | null | undefined, StudentIDs: number[] | null) => {
    const list: UserInfoType[] = []
    let stringTeacherIDs: string[] = []
    let stringStudentIDs: string[] = []

    if (TeacherIDs) {
      stringTeacherIDs = TeacherIDs?.map((item) => {
        return item.toString()
      })
      const teacherRes: resRoot<UserInfoType> = await apiList(stringTeacherIDs)
      for (const key in teacherRes.data) {
        list.push(teacherRes.data[key])
      }
    }
    if (StudentIDs) {
      stringStudentIDs = StudentIDs?.map((item) => item.toString())
      const studentRes: resRoot<UserInfoType> = await apiList(stringStudentIDs)
      for (const key in studentRes.data) {
        list.push(studentRes.data[key])
      }
    }
    setUserInfoState(list)
  }
  // 退出班级
  const quitClass = async () => {
    const req = new FormData()
    req.append('classID', id as string)
    const res = await apiQuit(req)
    if (res.code === 200) {
      navigate('/classlist')
      msgSuccess('退出班级成功')
    }
  }

  // 删除用户
  const deleteUser = async () => {
    const reqForm = new FormData()
    reqForm.append('classID', id as string)
    reqForm.append('studentID', thisUserId)
    const res = await apiClear(reqForm)
    if (res.code === 200) {
      setIsModalOpenDelete(false)
      msgSuccess('删除成员成功')
      await getClassInfo()
    }
  }

  // 删除班级
  const deleteClass = async () => {
    msgError('开发中')
    setIsModalOpenDeleteClass(false)
  }
  const handleCancel = () => {
    setIsModalOpen(false)
  }
  const handleCancelDelete = async () => {
    setIsModalOpenDelete(false)
  }
  useEffect(() => {
    if (!id) {
      navigate('/classlist')
      msgError('出错，请重试')
    } else {
      getClassInfo()
    }
  }, [])

  //   export type TeacherStudentData = {
  //   ID: number;
  //   Name: string;
  //   TeacherIDs: number[] | null;
  //   StudentIDs: number[] | null;
  //   Code: string
  // };
  return (
    <>
      <div className={styles['classlistinfo']}>
        <div className={styles['header']}>
          <div>
            <h1 style={{ display: 'inline-block', marginRight: '10px' }}>{classInfo?.Name}</h1>
            <a style={{ color: 'gray', cursor: 'text' }}>{'邀请号:' + classInfo?.Code}</a>
          </div>
          {userinfo?.role !== userPms.admin && (
            <Button
              type="primary"
              danger
              onClick={() => {
                setIsModalOpen(true)
              }}
            >
              退出班级
            </Button>
          )}
          {userinfo?.role === userPms.admin && (
            <Button
              type="primary"
              danger
              onClick={() => {
                setIsModalOpenDeleteClass(true)
              }}
            >
              删除班级
            </Button>
          )}
        </div>
        <div className={styles['content']}>
          <div>
            <h2>人员：</h2>
            {
              <div>
              <Table dataSource={userInfoState || []}>
                  <Column title="uid" dataIndex="uid" key="uid" />
                  <Column title="姓名" dataIndex="name" key="name" />
                  <Column title="邮箱" dataIndex="email" key="email" />
                  <Column
                    title="身份"
                    dataIndex="role"
                    key="role"
                    render={(role: number) => (
                      <>
                        {role === userPms.student && <Tag color={'green'}>{'学生'}</Tag>}
                        {role === userPms.teacher && <Tag color={'blue'}>{'老师'}</Tag>}
                        {role === userPms.admin && <Tag color={'red'}>{'管理员'}</Tag>}
                      </>
                    )}
                  />
                  {(userinfo?.role === userPms.admin || userinfo?.role === userPms.teacher) && (
                    <Column
                      title="操作"
                      key="action"
                      render={(_, record: UserInfoType) => (
                        <>
                          {record.role === userPms.student && (
                            <Button
                              danger
                              style={{ marginRight: '10px' }}
                              onClick={() => {
                                setIsModalOpenDelete(true)
                                setThisUserId(record.uid)
                              }}
                            >
                              删除成员
                            </Button>
                          )}
                        </>
                      )}
                    ></Column>
                  )}
                </Table>
              </div>
            }
          </div>
          <div>
            <h2 style={{ marginTop: '5px', marginBottom: '10px' }}>班级成绩概况：</h2>
            <ClassEchartsLine></ClassEchartsLine>
            <h3 style={{ marginTop: '5px', marginBottom: '10px' }}>上次考试学生成绩占比：</h3>
            <ClassEchartsCircle></ClassEchartsCircle>
          </div>
        </div>
      </div>
      <Modal title="退出班级" open={isModalOpen} onOk={quitClass} onCancel={handleCancel} okText="确认" cancelText="取消" okType="danger">
        <div style={{ height: '20px' }}></div>
        <div>确认退出班级后，您将无法再查看该班级的任何信息，确认退出？</div>
        <div style={{ height: '20px' }}></div>
      </Modal>
      <Modal title="删除成员" open={isModalOpenDelete} onOk={deleteUser} onCancel={handleCancelDelete} okText="确认" cancelText="取消" okType="danger">
        <div style={{ height: '20px' }}></div>
        <div>确定删除该成员？</div>
        <div style={{ height: '20px' }}></div>
      </Modal>
      <Modal
        title="删除成员"
        open={isModalOpenDeleteClass}
        onOk={deleteClass}
        onCancel={() => {
          setIsModalOpenDeleteClass(false)
        }}
        okText="确认"
        cancelText="取消"
        okType="danger"
      >
        <div style={{ height: '20px' }}></div>
        <div>确定删除该班级？</div>
        <div style={{ height: '20px' }}></div>
      </Modal>
    </>
  )
}
