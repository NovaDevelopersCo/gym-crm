import type { FC, SetStateAction, Dispatch } from "react"
import THeader from "./@THeader/THeader"
import TBody from "./@TBody/TBody"
import styles from './Table.module.scss'
import { } from "redux"
import { TColumnProps } from "../model"

type TTabelProps = {
	cols: TColumnProps[],
	content: unknown[],
	total: number,
	limit: number,
	setLimit: Dispatch<SetStateAction<number>>
}

const Table: FC<TTabelProps> = ({ cols, content, ...props }) => {
	return (
		<div className={styles.table__viewport}>
			<div className={styles.table}
				style={{ gridTemplateColumns: `50px repeat(${cols.length}, minmax(max-content, 1fr))` }}
			>
				<THeader cols={cols} {...props} />
				<TBody cols={cols} content={content} />
			</div>
		</div>
	)
}

export default Table