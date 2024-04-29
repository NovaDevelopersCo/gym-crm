import { useState } from 'react'

import { useGetAllClientsQuery } from '@/store'

import { AddClientBtn } from '@features/AddClient'
import { Pagination } from '@features/Pagination'

import { TBodyContent, Table } from '@entities/Table'

import ClientsFilter from './@ClientsFilter/ClientsFilter'
import styles from './ClientsList.module.scss'

const ClientsList = () => {
	const [limit, setLimit] = useState<number>(20)
	const [page, setPage] = useState<number>(1)
	const { data: clients } = useGetAllClientsQuery({
		page: page,
		limit: limit
	})
	const cols = [
		{ label: 'Имя', key: 'name' },
		{ label: 'Почта', key: 'email' },
		{ label: 'Телефон', key: 'phone' },
		{ label: 'Номер карты', key: 'cardNumber' },
		{ label: 'Пол', key: 'sex' }
	]

	return (
		<>
			<ClientsFilter />
			<AddClientBtn />
			<div className={styles.root}>
				{clients && (
					<>
						<Table
							content={clients.items as TBodyContent[]}
							cols={cols}
							total={clients.meta.total}
							limit={limit}
							setLimit={setLimit}
							fallback='Пользователей нет!'
						/>
						<Pagination
							limit={limit}
							total={clients.meta.total}
							page={page}
							setPage={setPage}
						/>
					</>
				)}
			</div>
		</>
	)
}

export default ClientsList