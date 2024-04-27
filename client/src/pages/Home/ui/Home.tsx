import { useAppSelector } from '@/store'
import { Typography } from 'antd'

const { Title } = Typography

const Home = () => {
	const user = useAppSelector(state => state['auth/slice'].user!)

	return (
		<div>
			<Title>Welcome, {user?.fio}</Title>
		</div>
	)
}

export default Home
