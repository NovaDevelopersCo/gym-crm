import { IClient, IGroup, useGetGroupsQuery } from '@/store'
import { Table } from 'antd'

import { DeleteGroupBtn } from '@features/DeleteGroup'
import { EditGroupBtn } from '@features/EditGroup'

import cl from './GroupsList.module.scss'

export const GroupsList = () => {
	const { data: groups } = useGetGroupsQuery()
	console.log(groups)

	const columns = [
		{
			title: 'id',
			dataIndex: 'id',
			key: 'id',
			align: 'center' as const
		},
		{
			title: 'название группы',
			dataIndex: 'name',
			key: 'name',
			align: 'center' as const
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
			align: 'center' as const
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
			title: 'action',
			key: 'action',
			align: 'center' as const,
			render: (record: IGroup) => (
				<div className={cl.root__action}>
					<EditGroupBtn />
					<DeleteGroupBtn groupId={record.id} />
				</div>
			)
		}
	]

	return (
		<div className={cl.root}>
			<Table
				columns={columns}
				scroll={{ x: 1000 }}
				bordered
				dataSource={groups?.items}
			/>
		</div>
	)
}
