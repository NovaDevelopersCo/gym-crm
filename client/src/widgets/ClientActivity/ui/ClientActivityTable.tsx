import { Table } from 'antd'

export type TClientActivity = {
	data: {
		id: string
		date: string
		activityType: string
		duration: string
		notes: string
	}[]
}

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
