// import { useAppDispatch } from "@/store";
import { useParams } from 'react-router-dom'

import { Button } from 'antd'
import clsx from 'clsx'
import { Bookmark } from 'lucide-react'

import styles from './MarkClient.module.scss'

function getCurrentWeekDates() {
	const currentDate = new Date()
	const currentDay = currentDate.getDay()
	const firstDayOfWeek = new Date(currentDate)
	firstDayOfWeek.setDate(currentDate.getDate() - currentDay + 1)

	const weekDates = []
	for (let i = 0; i < 7; i++) {
		const tempDate = new Date(firstDayOfWeek)
		tempDate.setDate(firstDayOfWeek.getDate() + i)
		weekDates.push(tempDate)
	}

	return weekDates
}

const MarkClient = () => {
	const { clientId } = useParams()
	const days = getCurrentWeekDates()
	const today = new Date()
	// const dispatch = useAppDispatch()

	const markUser = (id: string) => {
		// dispatch()
		console.log(id, ` - marked`)
	}

	return (
		<div className={styles.markClient}>
			<h3 className={styles.markClient__title}>
				Today: {new Date().toLocaleDateString()}
			</h3>
			<div className={styles.markClient__viewList}>
				{days.map((day, idx) => (
					<div
						key={idx}
						className={clsx(
							styles.elem,
							idx == 2 && styles.elem_active,
							today.getDate() == day.getDate() &&
								styles.elem_current
						)}
					>
						<h4>{day.getDate()}</h4>
					</div>
				))}
			</div>
			<Button
				onClick={() => markUser(clientId!)}
				className={styles.markClient__markBtn}
			>
				<Bookmark />
				Mark today
			</Button>
		</div>
	)
}

export default MarkClient
