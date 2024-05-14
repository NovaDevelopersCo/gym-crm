import { Button } from '@/shared'
import { Table, TableColumnsType } from 'antd'

import cl from './ClientSales.module.scss'
import { salesDataArr } from './clientSales.data'

interface DataType {
	id: string
	name: string
	dateOfSale: string
	validity: string
	status: string
}

const columns: TableColumnsType<DataType> = [
	{
		rowScope: 'row',
		width: 10,
		title: 'id',
		dataIndex: 'id',
		sorter: (a: DataType, b: DataType) => a.id.localeCompare(b.id)
	},
	{
		title: 'Наименование',
		dataIndex: 'name',
		sorter: (a: DataType, b: DataType) => a.name.localeCompare(b.name)
	},
	{
		title: 'Дата продажи',
		dataIndex: 'dateOfSale',
		sorter: (a: DataType, b: DataType) =>
			a.dateOfSale.localeCompare(b.dateOfSale)
	},
	{
		title: 'Срок действия',
		dataIndex: 'validity',
		sorter: (a: DataType, b: DataType) =>
			a.validity.localeCompare(b.validity)
	},
	{
		title: 'Статус',
		dataIndex: 'status',
		sorter: (a: DataType, b: DataType) => a.status.localeCompare(b.status)
	},
	{
		width: '100px',
		title: 'Action',
		dataIndex: 'action',
		render: () => (
			<div className={cl.root__action}>
				<Button>Edit</Button>
				<Button>Delete</Button>
			</div>
		)
	}
]

export const ClientSales = () => {
	return (
		<div className={cl.root}>
			<div className={cl.root__head}>
				<div className={cl.root__head__title}>Покупки</div>
				<Button>Добавить</Button>
			</div>
			<Table
				pagination={{ pageSize: 5 }}
				bordered
				rowKey={salesDataArr => salesDataArr.id}
				columns={columns}
				dataSource={salesDataArr}
				scroll={{ x: 1000 }}
			/>
		</div>
	)
}
