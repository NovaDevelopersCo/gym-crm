import { Table } from '@entities/Table'
// eslint-disable-next-line import/no-internal-modules
import data from '@/data/clients.data.json'
import styles from './ListOfClients.module.scss'
import { useState } from 'react'
import { Pagination } from '@features/Paggination'

export const ListOfClients = () => {
	const [limit, setLimit] = useState<number>(20)
	const [page, setPage] = useState<number>(1)
	const cols = [
		{ label: 'Имя', key: 'name' },
		{ label: 'Почта', key: 'email' },
		{ label: 'Телефон', key: 'phone' },
		{ label: 'Номер карты', key: 'cardNumber' },
		{ label: 'Пол', key: 'sex' },
	]

	const total = 100

	return (
		<div className={styles.root}>
			<Table content={data} cols={cols} total={total} limit={limit} setLimit={setLimit} />
			<Pagination limit={limit} total={total} page={page} setPage={setPage} />
		</div>

	)
}
