import { IClub, IDirection, IGroup, useGetGroupsQuery } from '@/store'
import { Table } from 'antd'

import { DeleteGroupBtn } from '@features/DeleteGroup'
import { EditGroupBtn } from '@features/EditGroup'

import cl from './GroupsList.module.scss'

export const GroupsList = () => {
	const { data: groups } = useGetGroupsQuery()

	const columns = [
		{
			width: 50,
			title: 'id',
			dataIndex: 'id',
			key: 'id',
			align: 'center' as const,
			sorter: (a: IGroup, b: IGroup) => +a.id - +b.id
		},
		{
			title: 'название группы',
			dataIndex: 'name',
			key: 'name',
			align: 'center' as const,
			sorter: (a: IGroup, b: IGroup) => a.name.localeCompare(b.name)
		},
		{
			title: 'Направления',
			dataIndex: 'direction',
			key: 'direction',
			align: 'center' as const,
			render: (direction: IDirection) => direction.name
		},
		{
			title: 'клуб',
			dataIndex: 'club',
			key: 'club',
			align: 'center' as const,
			render: (club: IClub) => club.name
		},
		{
			title: 'action',
			key: 'action',
			align: 'center' as const,
			render: (record: IGroup) => (
				<div className={cl.root__action}>
					<EditGroupBtn groupId={record.id} />
					<DeleteGroupBtn groupId={record.id} />
				</div>
			)
		}
	]

	return (
		<div className={cl.root}>
			<Table
				pagination={{ pageSize: 5 }}
				columns={columns}
				scroll={{ x: 1200 }}
				bordered
				dataSource={groups?.items}
			/>
		</div>
	)
}
