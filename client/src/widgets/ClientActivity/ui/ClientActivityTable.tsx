import { Table } from 'antd'

import { TClientActivity } from '../model'

const ClientActivityTable = ({ data }: TClientActivity) => {
	const columns = [
		{
			title: 'Дата',
			dataIndex: 'date',
			key: 'date'
		},
		{
			title: 'Тип активности',
			dataIndex: 'activityType',
			key: 'activityType'
		},
		{
			title: 'Длительность',
			dataIndex: 'duration',
			key: 'duration'
		},
		{
			title: 'Примечания',
			dataIndex: 'notes',
			key: 'notes'
		}
	]

	return (
		<Table
			columns={columns}
			dataSource={data}
			rowKey={record => record.id}
			pagination={{ pageSize: 10 }}
		/>
	)
}

export default ClientActivityTable
