import { TClientActivity } from './ClientActivityTable'

export const clientActivityArr: TClientActivity['data'] = [
	{
		id: '1',
		date: '2024-04-22',
		activityType: 'Тренировка с тренером',
		duration: '1 час',
		notes: 'Тренировка прошла успешно, увеличил вес на подходах'
	},
	{
		id: '2',
		date: '2024-04-20',
		activityType: 'Кардио',
		duration: '30 минут',
		notes: 'Пробежал 5 км, улучшил результат по сравнению с прошлым разом'
	}
]
