import type { RegisterOptions } from 'react-hook-form'

import { TOption } from '@shared/ui'

type TFirstClientsInfoFileds =
	| 'fio'
	| 'phone'
	| 'email'
	| 'birthdayDate'
	| 'club'

// type TSecondClientsInfoFileds =
// 	| 'card'
// 	| 'level'
// 	| 'trainer'
// 	| 'group'
// 	| 'discipline'

type clientInfoItem = {
	label: string
	name: TFirstClientsInfoFileds
	options?: TOption[]
	type?: 'text' | 'date' | 'tel' | 'email' | 'number'
	required?: boolean
	rules?: RegisterOptions
	isDatepicker?: boolean
}

export const firstClientInfo: clientInfoItem[] = [
	{
		label: 'ФИО',
		name: 'fio',
		type: 'text',
		required: true,
		rules: {
			pattern: {
				value: /^[А-ЯЁ][а-яё]+\s[А-ЯЁ][а-яё]+\s[А-ЯЁ][а-яё]+$/,
				message:
					'Ф.И.О. должно быть в формате: Васильев Василий Васильевич'
			}
		}
	},
	{
		label: 'Телефон',
		name: 'phone',
		type: 'tel',
		required: true,
		rules: {
			pattern: {
				value: /^7\d{10}$/,
				message: 'Номер телефона должен быть в формате: 79999999999'
			}
		}
	},
	{
		label: 'Почта',
		name: 'email',
		type: 'email',
		required: true,
		rules: {
			pattern: {
				value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
				message: 'Аккаунт должен быть в формате: @профиль'
			}
		}
	},
	{
		label: 'Дата рождения',
		name: 'birthdayDate',
		isDatepicker: true,
		type: 'date',
		required: true,
		rules: {
			pattern: {
				value: /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(19\d\d|20[0-2][0-4])$/,
				message: 'Дата должна быть в формате: ДД-ММ-ГГ'
			}
		}
	},
	{
		label: 'Локация',
		name: 'club',
		type: 'text',
		options: [
			{
				value: 'Strength Club',
				label: 'Strength Club г. Москва, ул. Колымыкинская д. 54'
			},
			{
				value: 'Mass Club',
				label: 'Mass Club г. Москва, ул. Шишинская д. 12'
			}
		]
	}
]

// TODO:
export const secondClientInfo: clientInfoItem[] = [
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
