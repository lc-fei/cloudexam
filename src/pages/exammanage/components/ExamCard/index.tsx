import { Tag } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useBreadRouterStore } from '../../../../store/useBreadRouterStore'
import styles from './index.module.scss'

export const ExamCardMTitle = ({
	name,
	time,
	grade,
	id,
}: {
	name: string
	time: string
	grade: string
	id: string | number
}) => {
	const navigator = useNavigate()
	const BreadcrumbItems = useBreadRouterStore((state) => state.routers)
	const poprouter = useBreadRouterStore((state) => state.poprouter)
	const pushrouter = useBreadRouterStore((state) => state.pushrouter)
	return (
		<div className={styles['manage-exam-card-title']}>
			<div
				className={styles['title-content']}
				onClick={() => {
					pushrouter({ title: name, path: `/exammanage/management/${id}` })
					navigator(`/exammanage/management/${id}`)
				}}
			>
				<h2>{name}</h2>
			</div>
			<span>{time}</span>|<span>{grade}</span>
		</div>
	)
}

export const ExamCardMTags = ({
	noinitsheet,
	noSheets,
	noStudents,
	noallocated,
	alldone,
}: {
	noinitsheet: boolean
	noSheets: boolean
	noStudents: boolean
	noallocated: boolean
	alldone: boolean
}) => {
	const text2tags = {
		noinitsheet: '待上传模板答题卡',
		noSheets: '待上传答题卡',
		noStudents: '待上传学生名单',
		noallocated: '待分配试题',
		alldone: '管理已完成',
	}
	if (alldone) {
		return (
			<div className={styles['tags']}>
				<Tag color='success'>{text2tags['alldone']}</Tag>
			</div>
		)
	} else
		return (
			<div className={styles['tags']}>
				{noinitsheet && <Tag color='error'>{text2tags['noinitsheet']}</Tag>}
				{noSheets && <Tag color='error'>{text2tags['noSheets']}</Tag>}
				{noStudents && <Tag color='error'>{text2tags['noStudents']}</Tag>}
				{noallocated && <Tag color='error'>{text2tags['noallocated']}</Tag>}
			</div>
		)
}
