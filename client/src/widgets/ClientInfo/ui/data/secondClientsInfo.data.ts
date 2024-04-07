import type { RegisterOptions } from 'react-hook-form'

import { TOption } from '@shared/ui'

type TSecondClientsInfoFileds =
	| 'card'
	| 'level'
	| 'trainer'
	| 'group'
	| 'discipline'

type secondClientInfoItem = {
	label: string
	name: TSecondClientsInfoFileds
	options?: TOption[]
	type?: 'text' | 'date' | 'tel' | 'email' | 'number'
	required?: boolean
	rules?: RegisterOptions
	isDatepicker?: boolean
}

export const secondClientInfo: secondClientInfoItem[] = [
	{
		label: 'Номер карты',
		name: 'card',
		type: 'number',
		required: false,
		rules: {
			pattern: {
				value: /^[0-9]{13,16}/,
				message: 'номер карты должен быть в формате XXXX-XXXX-XXXX-XXXX'
			}
		}
	},
	{
		label: 'Уровень подготовки',
		name: 'level',
		type: 'text',
		required: true,
		options: [
			{
				value: 'trainee',
				label: 'Ранее ничем не занимался'
			},
			{
				value: 'trainee+',
				label: 'Занимается больше 3х месяцев'
			},
			{
				value: 'junior',
				label: 'Занимается больше 6 месяцев'
			},
			{
				value: 'junior+',
				label: 'Занимается больше 1 года'
			},
			{
				value: 'middle',
				label: 'Занимается больше 2х лет'
			},
			{
				value: 'middle+',
				label: 'Мастер спорта по спорту'
			},
			{
				value: 'senior',
				label: 'Занимается всю жизнь'
			}
		]
	},
	{
		label: 'Тренер',
		name: 'trainer',
		type: 'text',
		required: false,
		options: [
			{
				value: 'NaN',
				label: 'Занимается без тренера'
			},
			{
				value: 'sergey',
				label: 'Тренер Сергей'
			},
			{
				value: 'danil',
				label: 'Тренер Данил'
			},
			{
				value: 'konstantin',
				label: 'Тренер Константин'
			}
		]
	},
	{
		label: 'Группа',
		name: 'group',
		type: 'text',
		required: false,
		options: [
			{
				value: 'NaN',
				label: 'Занимается без группы'
			},
			{
				value: 'donuts',
				label: 'Занимается в группе "Пончики"'
			},
			{
				value: 'hamsters',
				label: 'Занимается в группе "Хомячки"'
			}
		]
	},
	{
		label: 'Дисциплина',
		name: 'discipline',
		type: 'text',
		options: [
			{
				value: 'NaN',
				label: 'Нет особого критерия'
			},
			{
				value: 'fitness',
				label: 'Фитнесс'
			},
			{
				value: 'karate',
				label: 'Карате'
			},
			{
				value: 'nenormal`niy',
				label: 'Хоббихорсинг'
			}
		]
	}
]
