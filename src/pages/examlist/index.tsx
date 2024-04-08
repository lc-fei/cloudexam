import { Input, List, Radio, Select } from 'antd'
import { useNavigate } from 'react-router-dom'
import { ExamListMock } from '../../mock'
import {
	ExamCardDescription,
	ExamCardRankingButton,
	ExamCardTitle,
} from './components/ExamCard'
import styles from './index.module.scss'
const { Search } = Input
export const ExamList = () => {
	const navigator = useNavigate()

	return (
		<>
			{/* 头部操作 */}
			<div className={styles['exam-list-header']}>
				<div className={styles['radio-group']}>
					<Radio.Group buttonStyle='solid'>
						<Radio.Button value={'all'}>全部</Radio.Button>
						<Radio.Button value={'inprocess'}>进行中</Radio.Button>
						<Radio.Button value={'finished'}>已结束</Radio.Button>
					</Radio.Group>
				</div>

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
						{ value: 'all', label: '全部考试类型' },
						{ value: '2024', label: '单元测试' },
						{ value: '2023', label: '月考' },
						{ value: '2022', label: '期中考' },
						{ value: '2021', label: '期末考' },
						{ value: '2020', label: '其他' },
					]}
				/>
				<div className={styles['search']}>
					<Search placeholder='搜索考试名称' enterButton='搜索' />
				</div>
			</div>
			{/* 列表 */}

			<div className='exam-list'>
				<List
					bordered
					pagination={{
						position: 'bottom',
						align: 'center',
						size: 'default',
						pageSize: 6,
						showQuickJumper: true,
						showSizeChanger: false,
						showTotal: (total) => `共 ${total} 条`,
					}}
					dataSource={ExamListMock}
					renderItem={(item) => (
						<List.Item
							key={item.id}
							actions={
								item.ranking ? [<ExamCardRankingButton id={item.id} />] : []
							}
							style={{
								marginBottom: '10px',
							}}
						>
							<List.Item.Meta
								title={
									<ExamCardTitle
										title={item.name}
										status={item.status}
										id={item.id}
									/>
								}
								description={<ExamCardDescription {...item} />}
							></List.Item.Meta>
						</List.Item>
					)}
				></List>
			</div>
		</>
	)
}
