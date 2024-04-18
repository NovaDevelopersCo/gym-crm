import { Typography } from 'antd'

import CreateGroup from '@widgets/CreateGroup/ui/CreateGroup'

const { Title } = Typography

const Dashboard = () => {
	return (
		<Title>
			<div>
				<CreateGroup />
			</div>
		</Title>
	)
}

export default Dashboard
