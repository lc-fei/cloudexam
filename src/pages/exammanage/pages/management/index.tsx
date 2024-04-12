import { useEffect } from 'react'
import styles from './index.module.scss'
export const ExamManagementById = () => {
  useEffect(() => {
    // *无依赖，挂载/卸载时触发
    // *请求数据，渲染页面
  })
  const isUpdloadSheetlist = false
  const isUploadStudentlist = true
  const isAllocatedQuestions = true
  return (
    <div>
      <div className={styles['header']}>
        <h1>幸福中学第1次考试</h1>
      </div>

      <div className={styles['content']}>
        <div className={styles['upload-sheetlist']}>
          {isUpdloadSheetlist ? (
            <div>上传了答题卡</div>
          ) : (
            <div className={styles['upload-sheetlist-container']} onClick={(e) => e.preventDefault()}>
              <input type="file" multiple className={styles['upload-sheetlist-input']} placeholder="点击或者拖拽答题卡excel文件" onClick={(e) => console.log(e)} />
            </div>
          )}
        </div>
        <div className={styles['upload-studentslist']}>{isUploadStudentlist ? <div>上传了学生名单</div> : <div>拖拽或者选择学生名单excel文件</div>}</div>
        <div className={styles['allocated-questions']}>{isAllocatedQuestions ? <div>已分配试题</div> : <div>点击分配试题</div>}</div>
      </div>
    </div>
  )
}

/**
 * 1. 删除考试
 * 2. 获取考试信息 考试数据
 * 3. 上传答题卡
 * 4. 分发考试任务
 * 5. 添加试卷
 * 6. 删除试卷
 * 7. 添加试卷答案
 */

/**
 * 页面
 * 1. 管理员考试详细
 * 2. 学生考试详细 -> 直接跳转到老师考试详情的学情分析
 * 3. 老师考试详细
 * 4. 老师阅卷
 */
