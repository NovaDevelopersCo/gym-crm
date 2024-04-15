import { Typography } from 'antd'

import { useAppSelector } from '@store/lib'

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
