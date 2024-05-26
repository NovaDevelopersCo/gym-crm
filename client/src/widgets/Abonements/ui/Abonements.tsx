import { IAbonement, useGetAbonementsQuery } from '@/store'
import { Table } from 'antd'

const Abonements = () => {
	const columns = [
		{
			title: 'ID',
			dataIndex: 'id',
			key: 'id',
			width: '10px',
			sorter: (a: IAbonement, b: IAbonement) => +a.id - +b.id
		},
		{
			title: 'Название',
			dataIndex: 'name',
			key: 'name',
			width: '300px',
			sorter: (a: IAbonement, b: IAbonement) =>
				a.name.localeCompare(b.name)
		},
		{
			title: 'Осталось занятий',
			dataIndex: 'count',
			key: 'count',
			sorter: (a: IAbonement, b: IAbonement) => +a.count - +b.count
		},
		{
			title: 'Длительность',
			dataIndex: 'duration',
			key: 'duration',
			sorter: (a: IAbonement, b: IAbonement) => +a.duration - +b.duration
		},
		{
			title: 'Цена',
			dataIndex: 'price',
			key: 'price',
			sorter: (a: IAbonement, b: IAbonement) => +a.price - +b.price
		}
	]

	const { data } = useGetAbonementsQuery()

	return (
		<div>
			<Table columns={columns} dataSource={data?.items} rowKey={'id'} />
		</div>
	)
}

export default Abonements
