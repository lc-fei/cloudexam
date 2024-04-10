import { useParams } from 'react-router-dom'
import styles from './index.module.scss'
import { useEffect, useState } from 'react'
import { TeacherStudentData } from '@/api/class/type'
import { apiInfo, apiQuit } from '@/api/class/api'
import { useNavigate } from 'react-router-dom'
import { msgError, msgSuccess } from '@/utils/msg'
import { Button, Space, Table, Tag } from 'antd'
import Column from 'antd/es/table/Column'
export const ClassListInfo = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [classInfo, setClassInfo] = useState<TeacherStudentData | null>(null)
  const getClassInfo = async () => {
    const res = await apiInfo([parseInt(id as string)])
    setClassInfo(res.data[id as string])
  }
  const getTeachersInfo = async () => {
    console.log('加油写！！！')
  }
  const getStudentsInfo = async () => {
    console.log('加油写！！！')
  }
  const quitClass = async () => {
    const req = new FormData()
    req.append('classID', id as string)
    const res = await apiQuit(req)
    if (res.code === 200) {
      navigate('/classlist')
      msgSuccess('退出班级成功')
    }
  }
  useEffect(() => {
    if (!id) {
      navigate('/classlist')
      msgError('出错，请重试')
    } else {
      getClassInfo()
      getTeachersInfo()
      getStudentsInfo()
    }
  }, [])

  //   export type TeacherStudentData = {
  //   ID: number;
  //   Name: string;
  //   TeacherIDs: number[] | null;
  //   StudentIDs: number[] | null;
  //   Code: string
  // };

  interface DataType {
    key: React.Key
    firstName: string
    lastName: string
    age: number
    address: string
    tags: string[]
  }

  const data: DataType[] = [
    {
      key: '1',
      firstName: 'John',
      lastName: 'Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      firstName: 'Jim',
      lastName: 'Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      firstName: 'Joe',
      lastName: 'Black',
      age: 32,
      address: 'Sydney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ]
  return (
    <>
      <div className={styles['classlistinfo']}>
        <div className={styles['header']}>
          <div>
            <h1 style={{ display: 'inline-block', marginRight: '10px' }}>{classInfo?.Name}</h1>
            <a style={{ color: 'gray', cursor: 'text' }}>{'邀请号:' + classInfo?.Code}</a>
          </div>
          <Button type="primary" danger onClick={quitClass}>
            退出班级
          </Button>
        </div>
        <div className={styles['content']}>
          <h2>老师：</h2>
          <div>
            <Table dataSource={data}>
              <Column title="First Name" dataIndex="firstName" key="firstName" />
              <Column title="Last Name" dataIndex="lastName" key="lastName" />
              <Column title="Age" dataIndex="age" key="age" />
              <Column title="Address" dataIndex="address" key="address" />
              <Column
                title="Tags"
                dataIndex="tags"
                key="tags"
                render={(tags: string[]) => (
                  <>
                    {tags.map((tag) => {
                      let color = tag.length > 5 ? 'geekblue' : 'green'
                      if (tag === 'loser') {
                        color = 'volcano'
                      }
                      return (
                        <Tag color={color} key={tag}>
                          {tag.toUpperCase()}
                        </Tag>
                      )
                    })}
                  </>
                )}
              />
              <Column
                title="Action"
                key="action"
                render={(_: any, record: DataType) => (
                  <Space size="middle">
                    <a>Invite {record.lastName}</a>
                    <a>Delete</a>
                  </Space>
                )}
              />
            </Table>
          </div>
          <h2>学生：</h2>
          <div>
            <div>
              <Table dataSource={data}>
                <Column title="First Name" dataIndex="firstName" key="firstName" />
                <Column title="Last Name" dataIndex="lastName" key="lastName" />
                <Column title="Age" dataIndex="age" key="age" />
                <Column title="Address" dataIndex="address" key="address" />
                <Column
                  title="Tags"
                  dataIndex="tags"
                  key="tags"
                  render={(tags: string[]) => (
                    <>
                      {tags.map((tag) => {
                        let color = tag.length > 5 ? 'geekblue' : 'green'
                        if (tag === 'loser') {
                          color = 'volcano'
                        }
                        return (
                          <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
                          </Tag>
                        )
                      })}
                    </>
                  )}
                />
                <Column
                  title="Action"
                  key="action"
                  render={(_: any, record: DataType) => (
                    <Space size="middle">
                      <a>Invite {record.lastName}</a>
                      <a>Delete</a>
                    </Space>
                  )}
                />
              </Table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
