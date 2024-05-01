import { IClub, useGetClubsQuery } from '@/store'
import { Table } from 'antd'

import { AddClubBtn } from '@features/AddClub'
import { DeleteClubBtn } from '@features/DeleteClub'
import { EditClubBtn } from '@features/EditClub'

import cl from './ClubsControl.module.scss'

export const ClubsControl = () => {
	const { data: clubs } = useGetClubsQuery()

	const columns = [
		{
			title: 'ID',
			dataIndex: 'id',
			key: 'id',
			width: '10px',
			sorter: (a: IClub, b: IClub) => (+a.id) - (+b.id)
		},
		{ title: 'Название', dataIndex: 'name', key: 'name', width: '300px' },
		{
			title: 'Адрес',
			dataIndex: 'address',
			key: 'address',
			sorter: (a: IClub, b: IClub) => a.address.localeCompare(b.address)
		},
		// {
		// 	title: 'Admin',
		// 	dataIndex: 'admin',
		// 	key: 'admin'
		// },
		{
			title: 'Действия',
			key: 'action',
			render: (record: IClub) => (
				<div className={cl.root__action}>
					<EditClubBtn clubId={record.id} />
					<DeleteClubBtn clubId={record.id} />
				</div>
			)
		}
	]

	return (
		<div className={cl.root}>
			<AddClubBtn className={cl.root__button} />
			<Table columns={columns} dataSource={clubs?.items} rowKey={'id'} />
		</div>
	)
}
