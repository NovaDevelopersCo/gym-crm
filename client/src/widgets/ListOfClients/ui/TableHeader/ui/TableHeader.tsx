import type { ReactNode } from 'react'
import { useState } from 'react'

//eslint-disable-next-line
import { Radio } from './Radio/ui/Radio'
import cl from './TableHeader.module.scss'

export const TableHeader = ({ children }: { children: ReactNode }) => {
	const [handleUp, setHandleUp] = useState(false)
	const [handleDown, setHandleDown] = useState(false)

	const handleSortUp = () => {
		setHandleDown(false)
		setHandleUp(true)
	}

	const handleSortDown = () => {
		setHandleUp(false)
		setHandleDown(true)
	}

	return (
		<div className={cl.root}>
			<div className={`${cl.root__tableHead} ${cl.scrollbar_disable}`}>
				<div className={cl.root__tableHead__arrows}>
					<Radio
						handleUp={handleSortUp}
						sortUp={handleUp}
						handleDown={handleSortDown}
						sortDown={handleDown}
					/>
					<span className={cl.root__tableHead__arrows_filterBy}>
						ФИО
					</span>
				</div>
				<div className={cl.root__tableHead__arrows}>
					<Radio
						handleUp={handleSortUp}
						sortUp={handleUp}
						handleDown={handleSortDown}
						sortDown={handleDown}
					/>
					<span className={cl.root__tableHead__arrows_filterBy}>
						Локация
					</span>
				</div>
				<div className={cl.root__tableHead__arrows}>
					<Radio
						handleUp={handleSortUp}
						sortUp={handleUp}
						handleDown={handleSortDown}
						sortDown={handleDown}
					/>
					<span className={cl.root__tableHead__arrows_filterBy}>
						Дата регистрации
					</span>
				</div>
				<div className={cl.root__tableHead__arrows}>
					<Radio
						handleUp={handleSortUp}
						sortUp={handleUp}
						handleDown={handleSortDown}
						sortDown={handleDown}
					/>
					<span className={cl.root__tableHead__arrows_filterBy}>
						Услуги
					</span>
				</div>
				<div className={cl.root__tableHead__arrows}>
					<Radio
						handleUp={handleSortUp}
						sortUp={handleUp}
						handleDown={handleSortDown}
						sortDown={handleDown}
					/>
					<span className={cl.root__tableHead__arrows_filterBy}>
						Статус
					</span>
				</div>
			</div>
			<div>{children}</div>
		</div>
	)
}
