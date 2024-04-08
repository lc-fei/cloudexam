import { useParams } from 'react-router-dom'
export const GradeList = () => {
	const { id } = useParams()
	return <div>GradeList- {id}</div>
}
