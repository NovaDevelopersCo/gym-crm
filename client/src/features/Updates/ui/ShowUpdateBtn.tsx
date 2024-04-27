import { MouseEventHandler } from 'react'

import { Badge } from 'antd'
import { Bell } from 'lucide-react'

const ShowUpdateBtn = () => {
	const onClickHandler: MouseEventHandler<HTMLButtonElement> = e => {
		e.stopPropagation()
	}

	return (
		<button onClick={onClickHandler}>
			<Badge count={5}>
				<Bell />
			</Badge>
		</button>
	)
}

export default ShowUpdateBtn
