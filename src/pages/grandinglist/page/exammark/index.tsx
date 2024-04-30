import { apiFinish, apiMark } from '@/api/teacher/api'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSpinningStore } from '@/store/useSpinningStore'
import { answerInfoType, markInfoType } from '@/api/teacher/type'
import styles from './index.module.scss'
import { Button, Form, Input, Modal, Tabs } from 'antd'
import { msgError, msgSuccess } from '@/utils/msg'
import { checkTeacher } from '@/utils/routerGard'
export const ExamMark = () => {
  const { setSpinningStore } = useSpinningStore()
  const [markInfoList, setMarkInfoList] = useState<markInfoType[] | undefined>([])
  const [ansWerInfoList, setAnsWerInfoList] = useState<answerInfoType[] | undefined>([])
  const { id } = useParams()
  const idInt = parseInt(id as string)
  const [form] = Form.useForm()
  const navigate = useNavigate()

  // const getMarkInfo = async () => {
  //   setSpinningStore(true)
  //   // 获取阅卷任务
  //   const reqForm = new FormData()
  //   reqForm.append('examID', idInt.toString())
  //   const missionRes = await apiMission(reqForm)
  //   const missionInfo = missionRes.data
  //   const { Start, End } = missionInfo as resMission
  //   const reqForm2 = new FormData()
  //   reqForm2.append('start', Start.toString())
  //   reqForm2.append('end', End.toString())
  //   reqForm2.append('examID', idInt.toString())
  //   const markInfoRes = await apiPart(reqForm2)
  //   console.log('markInfoRes', markInfoRes)
  //   setMarkInfoList(markInfoRes.data)
  //   // 获取阅卷答案
  //   const answerRes = await apiAnswer(reqForm)
  //   console.log('answerRes', answerRes.data)
  //   setAnsWerInfoList(answerRes.data)
  //   setSpinningStore(false)
  // }
  const getMarkInfo = () => {
    setSpinningStore(true)
    // 获取替补答案
    setAnsWerInfoList([
      {
        ID: 0,
        examID: 14,
        offset: 0,
        img: 'D',
      },
      {
        ID: 1,
        examID: 14,
        offset: 1,
        img: '第一步:建立数据库服务器登录名;第二步:确认该用户是否为学生数据库的合法用户第三步:确认用户是否具有对student表的操作权限(正确回答3个步骤得2语句: create login Userl with password=123456create user Userl for login Userl(3 条语句每条1分)grant select,update on student to userl',
      },
      {
        ID: 2,
        examID: 14,
        offset: 2,
        img: 'T',
      },
      {
        ID: 3,
        examID: 14,
        offset: 3,
        img: '15',
      },
    ])
    // 获取阅卷任务
    setMarkInfoList([
      {
        OffSet: 0,
        Mark: 10,
        MaxMark: 50,
        State: 1,
        ID: 0,
        ExamID: 0,
        PaperID: 91,
        Img: 'https://api2.may1145.xyz/static/paper/155546mark.png',
        Text: '3分',
        Comments: '你的回答完全正确。数据独立性确实是数据库技术的重要特点，它主要指的是数据的逻辑结构和物理存储结构与应用程序之间的独立性。具体来说，逻辑独立性指的是数据库的逻辑结构改变时，应用程序不需要修改；物理独立性指的是数据的物理存储结构改变时，应用程序同样不需要修改。选项A提到的“数据与程序独立存放”并不准确描述数据独立性，因为数据独立性关注的是数据结构的改变对应用程序的影响，而不是数据与程序的存放位置。选项B“不同的数据被存放在不同的文件中”只是描述了数据的一种物理存储方式，并没有涉及到数据独立性。选项C“不同的数据只能被对应的应用程序所使用”则是关于数据访问权限的描述，与数据独立性无关。你选择了D选项“以上三种说法都不对”，这是正确的选择，因为A、B、C三个选项都没有准确描述数据独立性的含义。',
      },
      {
        OffSet: 1,
        Mark: 10,
        MaxMark: 50,
        State: 1,
        ID: 1,
        ExamID: 0,
        PaperID: 91,
        Img: 'https://api2.may1145.xyz/static/paper/155566mark2.png',
        Text: '4分',
        Comments: '该回答基本正确地描述了SQL Server的安全控制步骤，并尝试以DBA身份进行用户授权。然而，在实际操作中，SQL语句可能需要根据具体的SQL Server版本和配置进行调整。回答中的描述部分和SQL语句基本正确，但未明确提供SQL Server版本和具体的权限需求（例如，是否还需要插入、删除权限等），因此不能完全确定提供的SQL语句是否完全符合所有要求。另外，由于缺少对SQL Server安全策略、角色管理等的讨论，所以未能达到满分。在实际操作中，还需要考虑其他安全因素，如使用角色来管理权限、限制登录名的连接选项、审计用户活动等。但考虑到题目的限制和回答的内容，给出4分是合理的。',
      },
      {
        OffSet: 2,
        Mark: 10,
        MaxMark: 50,
        State: 1,
        ID: 2,
        ExamID: 0,
        PaperID: 91,
        Img: 'https://api2.may1145.xyz/static/paper/155580mark3.png',
        Text: '0分',
        Comments: '该题的陈述是不准确的。在关系型数据库中，一个表允许在一个列或多个列的组合上创建主键约束。复合主键是常见的，用于确保基于多个列的组合的唯一性。因此，原题的陈述需要修正。',
      },
      {
        OffSet: 3,
        Mark: 10,
        MaxMark: 50,
        State: 1,
        ID: 3,
        ExamID: 0,
        PaperID: 91,
        Img: 'https://api2.may1145.xyz/static/paper/155593mark4.png',
        Text: '3分',
        Comments: '该题考查了二项分布的性质，特别是其概率最大值出现的位置。学生正确地识别出当随机变量X服从二项分布B(100,0.25)时，概率P{X=k}在k=np时取得最大值，其中n为试验次数，p为单次试验成功的概率。在这个问题中，n=100，p=0.25，因此k=np=25。学生准确地计算出了k的值，并正确地指出当k=25时，P{X=k}取得最大值。这表明学生对二项分布的性质有深入的理解，并且能够准确地应用这些性质来解决问题。因此，该题应得满分。',
      },
    ])
    setSpinningStore(false)
  }
  useEffect(() => {
    checkTeacher(navigate)
    getMarkInfo()
  }, [])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const finishMask = async () => {
    let isAllDone = true
    markInfoList?.forEach((item) => {
      if (!item.State) {
        isAllDone = false
      }
    })
    if (!isAllDone) {
      msgError('请先完成所有任务')
      return
    }
    const reqForm = new FormData()
    reqForm.append('examID', idInt.toString())
    const res = await apiFinish(reqForm)
    console.log('res', res)
    msgSuccess('完成阅卷任务成功')
    setIsModalOpen(false)
  }

  return (
    <div className={styles['exammark']}>
      <div className={styles['header']}>
        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          完成阅卷任务
        </Button>
      </div>
      <div className={styles['content']}>
        <Tabs
          defaultActiveKey="1"
          tabPosition={'left'}
          style={{ height: 500 }}
          // @ts-expect-error: This line causes a type error because...
          items={markInfoList?.map((item) => {
            const answerUrlList = ansWerInfoList?.map((item) => item.img)
            if (!item || !answerUrlList) {
              return null
            }
            return {
              label: (
                <>
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <span style={{ marginRight: '10px' }}>{item.ID + 1}</span>
                    <span style={{ height: '10px', width: '10px', borderRadius: '50%', backgroundColor: item.State ? 'green' : 'red' }}></span>
                  </div>
                </>
              ),
              key: item.ID,
              children: (
                <>
                  <div className={styles['tabs']}>
                    <div className={styles['children']}>
                      <div className={styles['itemPaper']}>
                        <h2 style={{ height: '10%' }}>试题：</h2>
                        <img src={item.Img} alt="" />
                      </div>
                      <div className={styles['itemAnswer']}>
                        <h2 style={{ height: '10%' }}>答案：</h2>
                        <p style={{ fontSize: '20px', textIndent: '2em' }}>{answerUrlList[item.OffSet]}</p>
                      </div>
                    </div>
                    <div style={{ marginTop: '20px' }}>
                      <h3>评分参考: {item.Text}</h3>
                      <h3>AI评语：</h3>
                      <p style={{ textIndent: '2em' }}>{item.Comments}</p>
                    </div>
                    <div className={styles['submitform']}>
                      <Form
                        name="scoreForm"
                        form={form}
                        layout="inline"
                        onFinish={async (values) => {
                          console.log('values', values)
                          const reqForm = new FormData()
                          reqForm.append('partID', item.ID.toString())
                          reqForm.append('mark', values.score.toString())
                          const res = await apiMark(reqForm)
                          console.log('res', res)
                          getMarkInfo()
                          form.resetFields()
                          msgSuccess('提交成功')
                        }}
                        style={{ marginTop: '20px', marginLeft: '20px' }}
                      >
                        <Form.Item label="最终得分" name="score">
                          <Input />
                        </Form.Item>
                        <Form.Item>
                          <Button type="primary" htmlType="submit">
                            提交
                          </Button>
                        </Form.Item>
                      </Form>
                    </div>
                  </div>
                </>
              ),
            }
          })}
        />
      </div>
      <Modal title="完成阅卷任务" open={isModalOpen} onOk={finishMask} onCancel={() => setIsModalOpen(false)} okText="确认" cancelText="取消" okType="primary">
        <div style={{ height: '20px' }}></div>
        <div>是否确认完成阅卷任务？</div>
        <div style={{ height: '20px' }}></div>
      </Modal>
    </div>
  )
}
