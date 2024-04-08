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
						<div
							className={styles['upload-sheetlist-container']}
							onClick={(e) => e.preventDefault()}
						>
							<input
								type='file'
								multiple
								className={styles['upload-sheetlist-input']}
								placeholder='点击或者拖拽答题卡excel文件'
								onClick={(e) => console.log(e)}
							/>
						</div>
					)}
				</div>
				<div className={styles['upload-studentslist']}>
					{isUploadStudentlist ? (
						<div>上传了学生名单</div>
					) : (
						<div>拖拽或者选择学生名单excel文件</div>
					)}
				</div>
				<div className={styles['allocated-questions']}>
					{isAllocatedQuestions ? (
						<div>已分配试题</div>
					) : (
						<div>点击分配试题</div>
					)}
				</div>
			</div>
		</div>
	)
}
