import { Button, List, Select } from 'antd'
import { Outlet } from 'react-router-dom'
import { ManageExamStatusMock } from '../../mock'
import { ExamCardMTags, ExamCardMTitle } from './components/ExamCard'
import styles from './index.module.scss'
export const ExamManage = () => {
	ManageExamStatusMock.map((item, _) => {
		item.noSheets = true
		item.noStudents = true
		item.noallocated = true
		item.noinitsheet = true
		item.alldone = false
	})
	return (
		<div>
			<div className={styles['head-actions']}>
				<Select
					defaultValue={'all'}
					options={[
						{ value: 'all', label: '全部入学年份' },
						{ value: '2024', label: '2024' },
						{ value: '2023', label: '2023' },
						{ value: '2022', label: '2022' },
						{ value: '2021', label: '2021' },
						{ value: '2020', label: '2020' },
						{ value: '2019', label: '2019' },
						{ value: '2018', label: '2018' },
					]}
				/>
				<Select
					defaultValue={'all'}
					options={[
						{ value: 'all', label: '全部考试状态' },
						{ value: 'noinitsheet', label: '待上传模板答题卡' },
						{ value: 'nosheets', label: '待上传答题卡' },
						{ value: 'nostudents', label: '待上传学生名单' },
						{ value: 'noallocated', label: '试题未完全分配' },
						{ value: 'alldone', label: '管理完成' },
					]}
				/>
				<Button type='primary'>添加考试</Button>
			</div>
			<div className={styles['exam-list']}>
				<List
					bordered
					pagination={{
						position: 'bottom',
						align: 'center',
						size: 'default',
						pageSize: 6,
						showQuickJumper: true,
						showSizeChanger: false,
						showTotal: (total) => `共 ${total} 条数据`,
					}}
					dataSource={ManageExamStatusMock}
					renderItem={(item) => (
						<List.Item>
							<List.Item.Meta
								title={<ExamCardMTitle {...item} />}
								description={<ExamCardMTags {...item} />}
							></List.Item.Meta>
						</List.Item>
					)}
				></List>
			</div>
			<Outlet />
		</div>
	)
}
