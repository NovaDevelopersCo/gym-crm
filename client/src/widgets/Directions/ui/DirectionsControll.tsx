import { Button } from '@/shared'
import { IDirection, useGetDirectionsQuery } from '@/store'
import { Table } from 'antd'

import { AddDirectionForm } from '@features/Direction'

const DirectionsControll = () => {
	const { data: directions } = useGetDirectionsQuery()

	// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
	const handleDelete = (_id: string) => {}
	const columns = [
		{
			title: 'ID',
			dataIndex: 'id',
			key: 'id',
			width: '10px',
			sorter: (a: IDirection, b: IDirection) => a.id.localeCompare(b.id)
		},
		{ title: 'Name', dataIndex: 'name', key: 'name', width: '300px' },
		{
			title: 'Groups',
			dataIndex: 'groups',
			key: 'groups'
		},
		{
			title: 'Action',
			key: 'action',
			render: (record: IDirection) => (
				<Button onClick={() => handleDelete(record.id)}>Delete</Button>
			)
		}
	]
	return (
		<>
			<AddDirectionForm />
			{directions?.items.length != 0 ? (
				<Table columns={columns} dataSource={directions?.items} />
			) : (
				<h1>Направлений нет</h1>
			)}
		</>
	)
}

export default DirectionsControll
