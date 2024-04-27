import { Table, TableColumnsType } from 'antd'

import { salesDataArr } from './Sales.data'
import cl from './Sales.module.scss'

interface DataType {
	key: React.Key
	name: string
	dateOfSale: string
	validity: string
	status: string
}

const columns: TableColumnsType<DataType> = [
	{
		fixed: 'left',
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
	}
]

export const Sales = () => {
	return (
		<div className={cl.root}>
			<Table
				bordered
				columns={columns}
				dataSource={salesDataArr}
				scroll={{ x: 1000 }}
			/>
		</div>
	)
}
