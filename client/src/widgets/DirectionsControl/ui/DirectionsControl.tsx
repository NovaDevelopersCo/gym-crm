import { IDirection, IGroup, useGetDirectionsQuery } from '@/store'
import { Table } from 'antd'

import { AddDirectionForm } from '@features/AddDirection'
import { DeleteDirectionBtn } from '@features/DeleteDirection'

const DirectionsControl = () => {
	const { data: directions } = useGetDirectionsQuery()

	const columns = [
		{
			title: 'ID',
			dataIndex: 'id',
			key: 'id',
			width: '10px',
			sorter: (a: IDirection, b: IDirection) => (+a.id)-(+b.id)
		},
		{ title: 'Название', dataIndex: 'name', key: 'name', width: '300px' },
		{
			title: 'Группы',
			dataIndex: 'groups',
			key: 'groups',
			render: (groups: IGroup[]) => (
				groups.map(group=>group.name).join(', ')
			)
		},
		{
			title: 'Действия',
			key: 'action',
			render: (record: IDirection) => (
				<DeleteDirectionBtn directionId={record.id} />
			)
		}
	]
	return (
		<>
			<AddDirectionForm />
			{directions?.meta.total != 0 ? (
				<Table columns={columns} dataSource={directions?.items} />
			) : (
				<h1>Направлений нет</h1>
			)}
		</>
	)
}

export default DirectionsControl
