import { Button } from '@/shared'
import { Table, TableColumnsType } from 'antd'

import cl from './ClientVisits.module.scss'
import { visitsDataArr } from './clientVisits.data'

interface DataType {
	id: string
	name: string
	club: string
	dateAndTime: string
}

export const ClientVisits = () => {
	const columns: TableColumnsType<DataType> = [
		{
			rowScope: 'row',
			width: 10,
			title: 'id',
			dataIndex: 'id',
			sorter: (a: DataType, b: DataType) => a.id.localeCompare(b.id)
		},
		{
			title: 'Название',
			dataIndex: 'name',
			sorter: (a: DataType, b: DataType) => a.name.localeCompare(b.name)
		},
		{
			title: 'Локация',
			dataIndex: 'club',
			sorter: (a: DataType, b: DataType) => a.club.localeCompare(b.club)
		},
		{
			title: 'Дата и время',
			dataIndex: 'dateAndTime',
			sorter: (a: DataType, b: DataType) =>
				a.dateAndTime.localeCompare(b.dateAndTime)
		},
		{
			width: 100,
			title: 'action',
			dataIndex: 'action',
			render: () => (
				<div className={cl.root__action}>
					<Button>Edit</Button>
					<Button>Delete</Button>
				</div>
			)
		}
	]

	return (
		<div className={cl.root}>
			<div className={cl.root__head}>
				<div className={cl.root__head__title}>Посещения</div>
				<Button>Добавить</Button>
			</div>

			<Table
				pagination={{ pageSize: 5 }}
				bordered
				columns={columns}
				dataSource={visitsDataArr}
				scroll={{ x: 1000 }}
			/>
		</div>
	)
}
