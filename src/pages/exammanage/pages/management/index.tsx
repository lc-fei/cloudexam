import { useEffect, useState } from 'react'
import styles from './index.module.scss'
import { useNavigate, useParams } from 'react-router-dom'
import { apiDelete, apiInfoExam, apiJoin, apiPlan, apiQuit } from '@/api/exam/api'
import { ExamInfoType } from '@/api/exam/type'
import { Button, Card, Form, Input, Modal, Space, Upload } from 'antd'
import { msgError, msgSuccess } from '@/utils/msg'
import { useSpinningStore } from '@/store/useSpinningStore'
import { MinusCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons'
import { apiUploadAnswer, apiUploadPaper } from '@/api/upload/api'
import { reqNewList } from '@/api/paper/type'
import { apiInfo } from '@/api/class/api'
import { apiNew } from '@/api/paper/api'
import Meta from 'antd/es/card/Meta'
export const ExamManagementById = () => {
  const { id } = useParams()
  const [examInfo, setExamInfo] = useState<ExamInfoType | null>(null)
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
  const { setSpinningStore } = useSpinningStore()
  const navagate = useNavigate()
  const [AddPaper] = Form.useForm()
  const [isModalOpenAdd, setIsModalOpenAdd] = useState(false)
  useEffect(() => {
    // *无依赖，挂载/卸载时触发
    // *请求数据，渲染页面
    getExamInfo()
  }, [])
  // 获取考试信息
  const getExamInfo = async () => {
    setSpinningStore(true)
    const res = await apiInfoExam([parseInt(id as string)])
    if (res.data) setExamInfo(res.data[0])
    getClassList(res.data[0].classIDs)
    console.log('resdasdsas', res.data[0].classIDs)
    setSpinningStore(false)
  }
  // 删除考试
  const deleteExam = async () => {
    const req = new FormData()
    req.append('examID', id as string)
    const resDel = await apiDelete(req)
    if (resDel.code === 200) {
      navagate('/exammanage')
      msgSuccess('删除成功')
    } else {
      msgError('删除失败')
    }
    setIsModalOpenDelete(false)
  }
  const handleCancelDelete = () => {
    setIsModalOpenDelete(false)
  }

  // 上传答案
  const handleUploadAnswer = async (options) => {
    const { file } = options
    const formData = new FormData()
    formData.append('data', file)
    formData.append('type', 'paper')

    const res = await apiUploadAnswer(formData)
    msgSuccess('上传成功、请勿重复上传')
    return res.data
  }
  // 上传前检查
  const beforeUpload = (file) => {
    const isJPGorPNG = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJPGorPNG) {
      msgError('只能上传 JPG/PNG 格式的图片!')
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      msgError('图片必须小于 2MB!')
    }
    console.log(isJPGorPNG && isLt2M)
    if (isJPGorPNG && isLt2M) return false
    else return Upload.LIST_IGNORE
  }
  const beforeUploadAnswer = (file) => {
    const isJPGorPNG = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJPGorPNG) {
      msgError('只能上传 JPG/PNG 格式的图片!')
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      msgError('图片必须小于 2MB!')
    }
    console.log(isJPGorPNG && isLt2M)
    return isJPGorPNG && isLt2M
  }
  // 学生试卷上传
  const onFinish = async (values) => {
    setSpinningStore(true)
    console.log('Received values of form:', values.paper)
    const imgs: string[] = []
    const maxMark: number[] = []
    for (const item of values.paper) {
      const resForm = new FormData()
      resForm.append('data', item.data.file)
      const paperRes = await apiUploadPaper(resForm)
      imgs.push(paperRes.data)
      maxMark.push(parseInt(item.maxMark))
    }
    console.log('maxMark', maxMark)
    const req: reqNewList = []
    console.log('id', id)
    req.push({
      examID: parseInt(id as string),
      imgs: imgs,
      maxMark: maxMark,
      ownerID: parseInt(values.ownerID),
    })
    const res = await apiNew(req)
    console.log('res', res)
    AddPaper.resetFields()
    msgSuccess('上传成功')
    getExamInfo()
    setSpinningStore(false)
  }

  // 加入班级modal
  const handleOkAdd = () => {
    setIsModalOpenAdd(false)
  }
  const handleCancelAdd = () => {
    setIsModalOpenAdd(false)
  }
  const [formAdd] = Form.useForm()
  const onFinishAdd = async (values) => {
    console.log('Received values of form:', values)
    const req = new FormData()
    req.append('classID', values.classID)
    req.append('examID', id as string)
    const res = await apiJoin(req)
    console.log(res)
    formAdd.resetFields()
    getExamInfo()
    msgSuccess('添加成功')
    setIsModalOpenAdd(false)
  }
  const [classInfoList, setClassInfoList] = useState<any>(null)
  const getClassList = async (list) => {
    if (!list) return
    const res = await apiInfo(list)
    const classInfoObj = res.data
    setClassInfoList(Object.values(classInfoObj))
    console.log('classInfoList', classInfoList)
  }
  const deleteClass = async (classID) => {
    const req = new FormData()
    req.append('classID', classID)
    req.append('examID', id as string)
    await apiQuit(req)
    msgSuccess('删除成功')
    getExamInfo()
  }

  // 分发考试任务
  const [formPlan] = Form.useForm()
  const onFinishPlan = async (values) => {
    const cutStringArray = values.cutString.split('/')
    // 更新状态
    let num = 0
    cutStringArray.forEach((item) => {
      num += parseInt(item)
    })
    if (!examInfo?.paperID) {
      msgError('请先上传试卷')
      return
    } else if (num > examInfo?.paperID.length) {
      msgError('切片数量不能大于试卷总数量')
      return
    } else if (num < examInfo?.paperID.length) {
      msgError('切片数量不能小于试卷总数量')
      return
    } else {
      setSpinningStore(true)
      const req = {
        cut: cutStringArray,
        examID: id as string,
      }
      const res = await apiPlan(req)
      if (res.code === 200) {
        msgSuccess('分发成功')
      } else {
        msgError('分发失败')
      }
      setSpinningStore(false)
    }
  }
  return (
    <>
      <div className={styles['management']}>
        <div className={styles['header']}>
          <h1>{examInfo?.name}</h1>
          <div>
            <Button
              type="primary"
              onClick={() => {
                setIsModalOpenAdd(true)
              }}
              style={{ marginRight: '10px' }}
            >
              添加班级
            </Button>
            <Button
              type="primary"
              danger
              onClick={() => {
                setIsModalOpenDelete(true)
              }}
            >
              删除考试
            </Button>
          </div>
        </div>
        <div className={styles['content']}>
          <div style={{}} className={styles['mother']}>
            <h3>详细:</h3>
            <i>{examInfo?.desc}</i>
          </div>
          <div className={styles['mother']}>
            <div>
              <h3>学生试卷上传:</h3>
              <div>
                <Form
                  form={AddPaper}
                  name="AddPaper"
                  onFinish={onFinish}
                  style={{
                    maxWidth: 500,
                  }}
                  autoComplete="off"
                >
                  <Form.List name="paper">
                    {(fields, { add, remove }) => (
                      <>
                        {fields.map(({ key, name, ...restField }) => (
                          <Space
                            key={key}
                            style={{
                              display: 'flex',
                              marginBottom: 8,
                            }}
                            align="baseline"
                          >
                            <Form.Item
                              {...restField}
                              name={[name, 'data']}
                              rules={[
                                {
                                  required: true,
                                  message: '该试卷题目不能为空!',
                                },
                              ]}
                            >
                              <Upload
                                action={''}
                                beforeUpload={beforeUpload} // 上传前的文件校验
                                maxCount={1} // 一次只能上传一个文件
                                showUploadList={{ showPreviewIcon: true, showRemoveIcon: true }} // 自定义上传列表显示
                              >
                                <Button icon={<UploadOutlined />}>点击上传试卷题目</Button>
                              </Upload>
                            </Form.Item>
                            <Form.Item
                              {...restField}
                              name={[name, 'maxMark']}
                              rules={[
                                {
                                  required: true,
                                  message: '该题分值不能为空!',
                                },
                              ]}
                            >
                              <Input placeholder="题目分值" />
                            </Form.Item>
                            <MinusCircleOutlined onClick={() => remove(name)} />
                          </Space>
                        ))}

                        <Form.Item>
                          <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                            Add field
                          </Button>
                        </Form.Item>
                      </>
                    )}
                  </Form.List>
                  <Form.Item name={'ownerID'} label="学生ID" rules={[{ required: true, message: '学生ID不能为空! ' }]}>
                    <Input />
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      上传试卷
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </div>
            <div>
              <h3>答卷上传:</h3>
              <div>
                <Upload
                  name="file"
                  action="noop" // 使用 noop 防止默认的上传行为
                  showUploadList={false} // 不显示默认的上传列表
                  customRequest={handleUploadAnswer} // 使用自定义的上传处理函数
                  beforeUpload={beforeUploadAnswer} // 上传前的文件校验
                >
                  <Button icon={<UploadOutlined />}>点击上传答案</Button>
                </Upload>
              </div>
            </div>
          </div>
          <div className={styles['mother']}>
            <h3 style={{ display: 'inline-block', marginRight: '10px' }}>班级列表:</h3>
            <i style={{ fontStyle: 'normal' }}>ps:点击删除班级</i>
            <div className={styles['content']}>
              {classInfoList?.map((item) => {
                return (
                  <div key={item.ID}>
                    <Card
                      hoverable
                      className={styles['mycard']}
                      onClick={() => {
                        deleteClass(item.ID)
                      }}
                    >
                      <Meta title={item.Name} description={'班级号：' + item.Code + '  |  id：' + item.ID} />
                    </Card>
                  </div>
                )
              })}
            </div>
          </div>
          <div className={styles['mother']}>
            <h3 style={{ display: 'inline-block', marginRight: '10px' }}>分发考试任务:</h3>
            <i style={{ fontStyle: 'normal' }}>总题数：{examInfo?.paperID ? examInfo?.paperID.length : 0}</i>
            <Form style={{ maxWidth: 500 }} form={formPlan} autoComplete="off" onFinish={onFinishPlan}>
              <Form.Item
                name="cutString"
                label="试卷切片"
                tooltip="格式案例：1/2/4/8"
                rules={[
                  {
                    required: true,
                    message: '请输入试卷切片!',
                  },
                  {
                    pattern: /^\d+(\/\d+)*$/,
                    message: '格式不正确，请输入正确的格式，例如：1/2/4/8',
                  },
                ]}
              >
                <Input></Input>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  分发考试任务
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
      <Modal title="删除考试" open={isModalOpenDelete} onOk={deleteExam} onCancel={handleCancelDelete} okText="确认" cancelText="取消" okType="danger">
        <div style={{ height: '20px' }}></div>
        <div>确认删除考试后，该考试的所有信息将无法恢复，确认删除？</div>
        <div style={{ height: '20px' }}></div>
      </Modal>
      <Modal title="添加班级" open={isModalOpenAdd} onOk={handleOkAdd} onCancel={handleCancelAdd} footer="">
        <Form form={formAdd} name="addClass" layout="vertical" autoComplete="off" onFinish={onFinishAdd}>
          <Form.Item name="classID" label="班级ID" rules={[{ required: true, message: '请输入班级ID!' }]}>
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
