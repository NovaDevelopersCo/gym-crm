import type { Dispatch, FC, SetStateAction } from 'react'

import { Typography } from 'antd'

import { TBodyContent, TColumnProps } from '../model'
import TBody from './@TBody/TBody'
import THeader from './@THeader/THeader'
import styles from './Table.module.scss'

type TTabelProps = {
	cols: TColumnProps[]
	content: TBodyContent[]
	total: number
	limit: number
	setLimit: Dispatch<SetStateAction<number>>
	fallback: string
}

const { Title } = Typography

const Table: FC<TTabelProps> = ({ cols, content, fallback, ...props }) => {
	return (
		<div className={styles.table__viewport}>
			<div
				className={styles.table}
				style={{
					gridTemplateColumns: `50px repeat(${cols.length}, minmax(max-content, 1fr))`
				}}
			>
				<THeader cols={cols} {...props} />
				{content.length == 0 ? (
					<Title level={3} className={styles.table__fallback}>
						{fallback}
					</Title>
				) : (
					<TBody cols={cols} content={content} />
				)}
			</div>
		</div>
	)
}

export default Table
