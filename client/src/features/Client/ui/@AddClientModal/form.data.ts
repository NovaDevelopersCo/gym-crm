import { HTMLInputTypeAttribute } from 'react'
import type { RegisterOptions } from 'react-hook-form'

import type { TOption } from '@/shared'

type TNewClientFormFields =
	| 'fio'
	| 'phone'
	| 'email'
	| 'telegram'
	| 'instagram'
	| 'commentary'
	| 'age'
	| 'birthdayDate'
	| 'howDoYouKnow'
	| 'club'
	| 'beforeDirection'
	| 'direction'
	| 'groupIds'

type TNewClientFormItem = {
	label: string
	type?: HTMLInputTypeAttribute
	name: TNewClientFormFields
	options?: TOption[]
	required?: boolean
	isMulti?: boolean
	isTextArea?: boolean
	rules?: RegisterOptions
}

export const newClientFromItemsArr: TNewClientFormItem[] = [
	{
		label: 'Ф.И.О.',
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
		label: 'Номер телефона',
		type: 'number',
		name: 'phone',
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
		type: 'email',
		name: 'email',
		rules: {
			pattern: {
				value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
				message: 'Почта должна быть в формате: email@gmail.com'
			}
		}
	},
	{
		label: 'Телеграм',
		type: 'text',
		name: 'telegram',
		rules: {
			pattern: {
				value: /^@[a-z0-9]+$/i,
				message: 'Аккаунт должен быть в формате: @профиль'
			}
		}
	},
	{
		label: 'Инстаграм',
		type: 'text',
		name: 'instagram',
		rules: {
			pattern: {
				value: /^(?:http(?:s)?:\/\/)?(?:www\.)?instagram\.com\/([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\.(?!\.))){0,28}(?:[A-Za-z0-9_]))?)/i,
				message: 'Ссылка должна быть в формате: instagram.com/профиль'
			}
		}
	},
	{
		label: 'Возраст',
		type: 'number',
		name: 'age',
		rules: {
			pattern: {
				value: /^\d+$/,
				message: 'Возраст должен быть числом'
			},
			min: {
				value: 1,
				message: 'Возраст должен быть больше 0'
			},
			max: {
				value: 200,
				message: 'Возраст должен быть не более 200'
			}
		}
	},
	{
		label: 'Дата рождения',
		type: 'date',
		name: 'birthdayDate',
		rules: {
			pattern: {
				value: /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(19\d\d|20[0-2][0-4])$/,
				message:
					'Дата рождения должна быть валидной, в формате: ДД-ММ-ГГ'
			}
		}
	},
	{
		label: 'Как вы узнали о нас?',
		type: 'text',
		name: 'howDoYouKnow',
		required: true,
		isTextArea: true,
		rules: {
			maxLength: {
				value: 1000,
				message: 'Это поле не можем быть длиннее 1000 символов'
			}
		}
	},
	{
		label: 'Клуб',
		name: 'club',
		options: [
			{
				value: 'Strength Club',
				label: 'Strength Club г. Москва, ул. Колымыкинская д. 54'
			},
			{
				value: 'Mass Club',
				label: 'Mass Club г. Москва, ул. Шишинская д. 12'
			}
		],
		required: true
	},
	{
		label: 'Чем вы занимались до?',
		type: 'text',
		name: 'beforeDirection',
		required: true,
		isTextArea: true,
		rules: {
			maxLength: {
				value: 1000,
				message: 'Это поле не можем быть длиннее 1000 символов'
			}
		}
	},
	{
		label: 'В каких группах вы занимаетесь?',
		name: 'groupIds',
		options: [
			{ value: '345', label: 'Группа 345' },
			{ value: '987', label: 'Группа 987' },
			{ value: '433', label: 'Группа 433' }
		],
		required: true,
		isMulti: true
	},
	{
		label: 'Чем занимаетесь сейчас?',
		name: 'direction',
		options: [
			{ value: 'Box', label: 'Бокс' },
			{
				label: 'Kикбоксинг',
				value: 'Kickboxing'
			},
			{
				label: 'Карате',
				value: 'Karate'
			}
		],
		required: true,
		isMulti: true
	},

	{
		label: 'Комментарий',
		type: 'text',
		name: 'commentary',
		isTextArea: true,
		rules: {
			maxLength: {
				value: 1000,
				message: 'Это поле не можем быть длиннее 1000 символов'
			}
		}
	}
]
