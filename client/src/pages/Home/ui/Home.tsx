import { useEffect } from 'react'

import { Typography } from 'antd'

import { useAppSelector } from '@store/lib'

const { Title } = Typography

const Home = () => {
	const user = useAppSelector(state => state['auth/slice'].user!)
	useEffect(() => {
		// const notificationConfig = {
		// 	title: 'Успешная авторизация',
		// 	description: `Добро пожаловать, `,
		// 	type: "success"
		// }
		// const openNotification = notification(notificationConfig)
		// openNotification()
	}, [])

	return (
		<div>
			<Title>Welcome, {user?.fio}</Title>
		</div>
	)
}

export default Home
