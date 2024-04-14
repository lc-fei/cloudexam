import { apiAnswer, apiFinish, apiMark, apiMission, apiPart } from '@/api/teacher/api'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSpinningStore } from '@/store/useSpinningStore'
import { answerInfoType, markInfoType, resMission } from '@/api/teacher/type'
import styles from './index.module.scss'
import { Button, Form, Input, Modal, Tabs } from 'antd'
import { msgError, msgSuccess } from '@/utils/msg'
export const ExamMark = () => {
  const { setSpinningStore } = useSpinningStore()
  const [markInfoList, setMarkInfoList] = useState<markInfoType[] | undefined>([])
  const [ansWerInfoList, setAnsWerInfoList] = useState<answerInfoType[] | undefined>([])
  const { id } = useParams()
  const idInt = parseInt(id as string)
  const [form] = Form.useForm()

  const getMarkInfo = async () => {
    setSpinningStore(true)
    // 获取阅卷任务
    const reqForm = new FormData()
    reqForm.append('examID', idInt.toString())
    const missionRes = await apiMission(reqForm)
    const missionInfo = missionRes.data
    const { Start, End } = missionInfo as resMission
    const reqForm2 = new FormData()
    reqForm2.append('start', Start.toString())
    reqForm2.append('end', End.toString())
    reqForm2.append('examID', idInt.toString())
    const markInfoRes = await apiPart(reqForm2)
    console.log('markInfoRes', markInfoRes)
    setMarkInfoList(markInfoRes.data)
    // 获取阅卷答案
    const answerRes = await apiAnswer(reqForm)
    console.log('answerRes', answerRes.data)
    setAnsWerInfoList(answerRes.data)
    setSpinningStore(false)
  }
  useEffect(() => {
    getMarkInfo()
  }, [])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const finishMask = async () => {
    markInfoList?.forEach((item) => {
      if (!item.State) {
        msgError('请先完成所有任务')
        return
      }
    })
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
          items={markInfoList?.map((item) => {
            const answerUrlList = ansWerInfoList?.map((item) => item.img)
            if (!item || !answerUrlList) {
              return null
            }
            return {
              label: (
                <>
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <span style={{ marginRight: '10px' }}>{item.ID}</span>
                    <span style={{ height: '10px', width: '10px', borderRadius: '50%', backgroundColor: item.State ? 'green' : 'red' }}></span>
                  </div>
                </>
              ),
              key: item.ID,
              children: (
                <>
                  <div className={styles['children']}>
                    <div className={styles['itemPaper']}>
                      <h2 style={{ height: '10%' }}>试题：</h2>
                      <img src={item.Img} alt="" />
                    </div>
                    <div className={styles['itemAnswer']}>
                      <h2 style={{ height: '10%' }}>答案：</h2>
                      <img src={answerUrlList[item.OffSet]} />
                    </div>
                  </div>
                  <div></div>
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
                    <Form.Item label="得分" name="score">
                      <Input />
                    </Form.Item>
                    <Form.Item>
                      <Button type="primary" htmlType="submit">
                        提交
                      </Button>
                    </Form.Item>
                  </Form>
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
