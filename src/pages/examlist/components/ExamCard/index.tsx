import { Tag, Tooltip } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { RankingIcon } from '../../../../assets/icons'
import styles from './index.module.scss'
type TChangeStatus = {
	waiting: [string, string]
	pending: [string, string]
	finished: [string, string]
}

export const ExamCardTitle = ({
	status,
	title,
	id,
}: {
	status: 'waiting' | 'pending' | 'finished'
	title: string
	id: string | number
}) => {
	const status2stuatus: TChangeStatus = {
		waiting: ['待上传答题卡', 'error'],
		pending: ['阅卷中', 'processing'],
		finished: ['已结束', 'success'],
	}
	// * 调tag和title的间距
	const tagRef = React.useRef<HTMLDivElement>(null)
	const navigator = useNavigate()
	return (
		<div className={styles['examCardTitle']}>
			<Tag
				color={status2stuatus[status][1]}
				ref={tagRef}
				className={styles['examCardTitle__tag']}
			>
				{status2stuatus[status][0]}
			</Tag>
			<Tooltip
				placement='top'
				title={`考试ID: ${id}`}
				className={styles['examCardTitle__title']}
			>
				<h2
					onClick={(e) => {
						console.log('Navigating to:', `/examlist/gradelist/${id}`)
						navigator(`/examlist/gradelist/${id}`, { replace: true })
						e.stopPropagation()
					}}
				>
					{title}
				</h2>
			</Tooltip>
		</div>
	)
}

type TExamDescription = {
	time: string
	grade: string
	analysis: 'waiting' | 'published' | 'processing'
}
export const ExamCardDescription = ({
	time,
	grade,
	analysis,
}: TExamDescription) => {
	const analysis2status = {
		waiting: '阅卷结束后，系统自动分析并发布',
		published: '已发布',
		processing: '正在分析',
	}
	return (
		<div>
			<span>{time}</span>
			<span> | </span>
			<span>{grade}</span>
			<span> | </span>
			<span>{analysis2status[analysis]}</span>
		</div>
	)
}

export const ExamCardRankingButton = ({ id }: { id: string | number }) => {
	return (
		<div className={styles['RankingButton']}>
			<span className={styles['RankingButton__icon_container']}>
				<RankingIcon />
			</span>
			<span>排行榜</span>
		</div>
	)
}
