import { IClient, IGroup, useGetGroupsQuery } from '@/store'
import { Table } from 'antd'

import { DeleteGroupBtn } from '@features/DeleteGroup'
import { EditGroupBtn } from '@features/EditGroup'

import './GroupList.scss'
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
			fixed: 'left' as const,
			title: 'название группы',
			dataIndex: 'name',
			key: 'name',
			align: 'center' as const,
			sorter: (a: IGroup, b: IGroup) => a.name.localeCompare(b.name)
		},
		{
			title: 'Направления',
			children: [
				{
					title: 'id направления',
					dataIndex: ['direction', 'id'],
					key: ['direction', 'id'],
					align: 'center' as const
				},
				{
					title: 'название направления',
					dataIndex: ['direction', 'name'],
					key: ['direction', 'name'],
					align: 'center' as const
				}
			]
		},
		{
			title: 'участники',
			dataIndex: 'users',
			render: (users: IClient[]) => (
				<div className={cl.root__users}>
					{users.map(user => (
						<div
							className={`${cl.root__users_item} ${users.length > 1 && cl.root__users_item_borderBottom}`}
							key={user.id}
						>
							{user.fio}
						</div>
					))}
				</div>
			),
			key: 'users',
			align: 'center' as const,
			sorter: (a: IGroup, b: IGroup) => b.users.length - a.users.length
		},
		{
			title: 'клуб',
			children: [
				{
					title: 'id клуба',
					dataIndex: ['club', 'id'],
					key: ['club', 'id'],
					align: 'center' as const
				},
				{
					title: 'название клуба',
					dataIndex: ['club', 'name'],
					key: ['club', 'name'],
					align: 'center' as const
				},
				{
					title: 'адрес клуба',
					dataIndex: ['club', 'address'],
					key: ['club', 'address'],
					align: 'center' as const
				}
			]
		},
		{
			fixed: 'right' as const,
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
