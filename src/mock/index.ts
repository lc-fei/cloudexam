type TExamItem = {
	status: 'waiting' | 'pending' | 'finished'
	id: string | number
	name: string
	time: string
	grade: string
	analysis: 'waiting' | 'published' | 'processing'
	ranking: boolean
	manageStatus: {
		initSheet: boolean
		sheets: boolean
		students: boolean
	}
}

const statusMap = ['waiting', 'pending', 'finished']
const rankingMap = [true, false]

export const ExamListMock: TExamItem[] = new Array(87).fill({}).map((_, i) => ({
	status: statusMap[Math.floor(Math.random() * 3)],
	id: `${Math.floor(Math.random() * 1000000000) + i}`,
	name: `幸福中学第${i + 1}次考试`,
	time: '2024-3-20',
	grade: `202${(i % 5) + 1}级`,
	analysis: 'published',
	ranking: rankingMap[Math.floor(Math.random() * 2)],
	manageStatus: {
		initSheet: rankingMap[Math.floor(Math.random() * 2)],
		sheets: rankingMap[Math.floor(Math.random() * 2)],
		students: rankingMap[Math.floor(Math.random() * 2)],
	},
}))

type TManageExamStatus = {
	id: string | number
	name: string
	time: string
	grade: string
	noinitsheet: boolean
	noSheets: boolean
	noStudents: boolean
	noallocated: boolean
	alldone: boolean
}

export const ManageExamStatusMock: TManageExamStatus[] = new Array(87)
	.fill({})
	.map((_, i) => ({
		id: `${Math.floor(Math.random() * 1000000000) + i}`,
		name: `幸福中学第${i + 1}次考试`,
		time: '2024-3-20',
		grade: `202${(i % 5) + 1}级`,
		noinitsheet: true,
		noSheets: true,
		noStudents: true,
		noallocated: true,
		alldone: false,
	}))
