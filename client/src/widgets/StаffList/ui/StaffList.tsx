import { useState } from 'react'

import { IClub, IStaff, useGetStaffQuery } from '@/store'
import { Radio, Table } from 'antd'

import cl from './StaffList.module.scss'
import { DeleteStaffBtn } from '@features/DeleteStaff'
import { AddStaffBtn } from '@features/AddStaff'
import { EditStaffBtn } from '@features/EditStaff';

export const StaffList = () => {
	const { data: employees } = useGetStaffQuery()

	const paginationSizeOptions = [10, 20, 50]
	const [paginationSize, setPaginationSize] = useState(
		paginationSizeOptions[0]
	)

	const columns = [
		{
			title: 'ID',
			dataIndex: 'id',
			key: 'id',
			width: '10px',
			sorter: (a: IStaff, b: IStaff) => (+a.id) - (+b.id)
		},
		{
			title: 'Почта',
			dataIndex: 'email',
			key: 'email',
			sorter: (a: IStaff, b: IStaff) => a.email.localeCompare(b.email)
		},
		{
			title: 'Клуб',
			dataIndex: 'club',
			key: 'club',
			sorter: (a: IStaff, b: IStaff) => a.club.localeCompare(b.email),
			render: (club: IClub) => club?.name
		},
		{
			title: 'Роль',
			dataIndex: 'role',
			key: 'role',
			sorter: (a: IStaff, b: IStaff) => a.role.localeCompare(b.role)
		},
		{
			title: 'Последняя активность',
			dataIndex: 'lastActivity',
			key: 'lastActivity',
			sorter: (a: IStaff, b: IStaff) =>
				a.lastActivity.localeCompare(b.lastActivity)
		},
		{
			title: 'Действия',
			key: 'action',
			render: (record: IStaff) => (
				<>
					<EditStaffBtn staffId={record.id} />
					<DeleteStaffBtn staffId={record.id} />
				</>
			)
		}
	]

	return (
		<div className={cl.root}>
			<AddStaffBtn className={cl.root__add_btn} />
			<div className={cl.root__info}>
				<p>
					Всего работников: <span>{employees?.meta.total}</span>
				</p>
				<div className={cl.root__info__pagination}>
					<p>Отображать по:</p>
					<Radio.Group
						onChange={e => setPaginationSize(e.target.value)}
					>
						{paginationSizeOptions.map(size => (
							<Radio.Button key={size} value={size}>
								{size}
							</Radio.Button>
						))}
					</Radio.Group>
				</div>
			</div>
			<Table
				columns={columns}
				rowKey={(record: IStaff) => record.id}
				dataSource={employees?.items}
				scroll={{ x: 'max-content' }}
				pagination={{
					pageSize: paginationSize
				}}
			/>
		</div>
	)
}
