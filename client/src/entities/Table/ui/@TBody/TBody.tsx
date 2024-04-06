import { v4 as uuid } from 'uuid'
import style from './TBody.module.scss'
import { GripVertical } from 'lucide-react'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import {TColumnProps} from '../../model'

type TBodyProps = { cols: TColumnProps[], content: unknown[] }

const TBody: FC<TBodyProps> = ({ cols, content }) => {
	return (
		<section className={style.body}>
			{content.map(element =>
				<Link key={uuid()} className={style.body__row} to={`/clients/${element.id}`}>
					<button onClick={e => { e.preventDefault() }} className={style.body__col}>
						<GripVertical />
					</button>
					{cols.map(col =>
						<div key={uuid()} className={style.body__col} >
							{element[col.key]}
						</div>
					)}
				</Link>
			)}

		</section>
	)
}

export default TBody