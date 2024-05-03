import { useState } from 'react'
import { GetItemsParams, IClient, IClub, IGroup, useGetAllClientsQuery } from '@/store'
import { AddClientBtn } from '@features/AddClient'
import ClientsFilter from './@ClientsFilter/ClientsFilter'
import styles from './ClientsList.module.scss'
import { Table, Radio, TableColumnsType } from 'antd';

const ClientsList = () => {
	const [params, setParams] = useState<GetItemsParams<IClient>>({
		page: 1,
		count: 20,
		searchBy: undefined,
		sortBy: undefined,
		sortOrder: undefined
	})
	const { data: clients } = useGetAllClientsQuery(params)
	const liimitSizeOptions = [20, 50, 100]

	const columns: TableColumnsType<IClient> = [
		{ title: 'ФИО', key: 'fio', dataIndex: 'fio', fixed: 'left' },
		{ title: 'Почта', key: 'email', dataIndex: 'email' },
		{ title: 'Телефон', key: 'phone', dataIndex: 'phone' },
		{ title: 'Группы', key: 'groups', dataIndex: 'groups', render: (groups: IGroup[]) => (groups.map(group => group.name).join(', ')) },
		{ title: 'Клуб', key: 'club', dataIndex: 'club', render: (club: IClub) => (club?.name) },
		{ title: 'Статус', key: 'status', dataIndex: 'status' },
		{ title: 'Направление', key: 'direction', dataIndex: 'direction' },
		{ title: 'Кол-во дней с визита', key: 'lastVisitDays', dataIndex: 'lastVisitDays' }
	]

	return (
		<>
			<ClientsFilter setParams={setParams} />
			<AddClientBtn />
			<div className={styles.table}>
				<div className={styles.table__info}>
					<p>
						Найдено клиентов: <span>{clients?.meta.total}</span>
					</p>
					<div className={styles.table__info__pagination}>
						<p>Отображать по:</p>
						<Radio.Group
							onChange={e => setParams(prev => ({ ...prev, count: e.target.value }))}
						>
							{liimitSizeOptions.map(size => (
								<Radio.Button key={size} value={size}>
									{size}
								</Radio.Button>
							))}
						</Radio.Group>
					</div>
				</div>
				<Table
					columns={columns}
					dataSource={clients?.items}
					scroll={{ x: 1500, y: '70vh' }}
					rowKey={(record) => record.id}
					pagination={{
						pageSize: params.count,
						current: params.page,
						total: clients?.meta.total,
						onChange: (page: number) => {
							setParams(prev => ({ ...prev, page }))
						}
					}}
				/>
			</div>
		</>
	)
}

export default ClientsList
