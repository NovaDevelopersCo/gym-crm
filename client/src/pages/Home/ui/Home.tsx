import { useAppSelector } from '@/store'
import { Typography } from 'antd'

const { Title } = Typography

import styles from './Home.module.scss'

const Home = () => {
	const user = useAppSelector(state => state['auth/slice'].user!)

	return (
		<div>
			<Title>Здравствуйте, {user?.role}</Title>
			<div className={styles.horizontal__wrapper}>
				<div>
					<Title level={2}>Ваша краткая аналитика</Title>
				</div>
				<div>
					<Title level={2}>Ваши задачи</Title>
				</div>
			</div>

		</div>
	)
}

export default Home
