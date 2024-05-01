import { IGroup, useGetGroupsQuery } from '@/store'
import { Table } from 'antd'

import { DeleteGroupBtn } from '@features/DeleteGroup'
import { EditGroupBtn } from '@features/EditGroup'

import cl from './GroupsList.module.scss'

export const GroupsList = () => {
	const { data: groups } = useGetGroupsQuery()

	const columns = [
		{
			title: 'id',
			dataIndex: 'id',
			key: 'id'
		},
		{
			title: 'название группы',
			dataIndex: 'name',
			key: 'name'
		},
		{
			title: 'Направления',
			children: [
				{
					title: 'id направления',
					dataIndex: ['direction', 'id'],
					key: ['direction', 'id']
				},
				{
					title: 'название направления',
					dataIndex: ['direction', 'name'],
					key: ['direction', 'name']
				}
			]
		},
		{
			title: 'участники',
			children: [
				{
					title: 'id пользователя',
					dataIndex: ['users', 'id'],
					key: ['users', 'id']
				},
				{
					title: 'ФИО пользователя',
					dataIndex: ['users', 'fio'],
					key: ['users', 'fio']
				}
			]
		},
		{
			title: 'клуб',
			children: [
				{
					title: 'id клуба',
					dataIndex: ['club', 'id'],
					key: ['club', 'id']
				},
				{
					title: 'название клуба',
					dataIndex: ['club', 'name'],
					key: ['club', 'name']
				},
				{
					title: 'адрес клуба',
					dataIndex: ['club', 'address'],
					key: ['club', 'address']
				}
			]
		},
		{
			title: 'action',
			key: 'action',
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
