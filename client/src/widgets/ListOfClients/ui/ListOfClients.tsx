import { useState } from 'react'

import { useGetAllClientsQuery } from '@/store'

// import data from '@/data/clients.data.json'
import { Pagination } from '@features/Paggination'

import { TBodyContent, Table } from '@entities/Table'

import styles from './ListOfClients.module.scss'

export const ListOfClients = () => {
	const [limit, setLimit] = useState<number>(20)
	const [page, setPage] = useState<number>(1)
	const { data } = useGetAllClientsQuery({
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
		<div className={styles.root}>
			{data && (
				<>
					<Table
						content={data.items as TBodyContent[]}
						cols={cols}
						total={data.meta.total}
						limit={limit}
						setLimit={setLimit}
						fallback='Пользователей нет!'
					/>
					<Pagination
						limit={limit}
						total={data.meta.total}
						page={page}
						setPage={setPage}
					/>
				</>
			)}
		</div>
	)
}
