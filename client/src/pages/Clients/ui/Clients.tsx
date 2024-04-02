import { Typography } from 'antd'

import { useAppSelector } from '@store/index'
import { NewClient } from '@widgets/Client'

const { Title } = Typography

const ClientsPage = () => {
	const user = useAppSelector(state => state['auth/slice'].user!)
	return user.role != 'trainer' ? <NewClient /> : <Title>Client list page</Title>
}

export default ClientsPage
