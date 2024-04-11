import { Dispatch, FC, SetStateAction } from 'react'

import { v4 as uuid } from 'uuid'

import { TColumnProps } from '../../model'
import cl from './THeader.module.scss'

type THeaderProps = {
	cols: TColumnProps[]
	limit: number
	setLimit: Dispatch<SetStateAction<number>>
	total: number
}

const THeader: FC<THeaderProps> = ({ cols, limit, setLimit, total }) => {
	const limits = [20, 50, 100]

	return (
		<header className={cl.header}>
			<div className={cl.header__row_flex}>
				<h1 className={cl.header__row_flex__el}>
					Всего найдено: <b>{total}</b>
				</h1>
				<div className={cl.header__row_flex__el}>
					<p>Отображать по</p>
					{limits.map(lim => (
						<button
							key={uuid()}
							onClick={() => {
								setLimit(lim)
							}}
							style={limit == lim ? { color: 'blue' } : {}}
						>
							{lim}
						</button>
					))}
				</div>
			</div>
			<div className={cl.header__row}>
				<div className={cl.header__el}></div>
				{cols.map(col => (
					<div key={col.key} className={cl.header__el}>
						{col.label}
					</div>
				))}
			</div>
		</header>
	)
}

export default THeader
