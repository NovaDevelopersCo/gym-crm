import { HTMLInputTypeAttribute } from 'react'
import type { RegisterOptions } from 'react-hook-form'

import type { TOption } from '@/shared'

type TNewClientFormFields =
	| 'email'
	| 'phone'
	| 'fio'
	| 'birthday'
	| 'howKnow'
	| 'club'
	| 'groups'
	| 'instagram'
	| 'commentary'

type TNewClientFormItem = {
	label: string
	type?: HTMLInputTypeAttribute
	name: TNewClientFormFields
	options?: TOption[]
	required?: boolean
	isMulti?: boolean
	isTextArea?: boolean
	rules?: RegisterOptions
	format?: string
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
		label: 'Дата рождения',
		type: 'date',
		name: 'birthday',
		format: 'YYYY-MM-DD',
		required: true,
		rules: {
			pattern: {
				value: /^(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))/i,
				message: 'Введён некорректный формат даты'
			},
			maxLength: {
				value: 10,
				message: 'Это поле не может быть длиннее'
			}
		}
	},
	{
		label: 'Как вы узнали о нас?',
		type: 'text',
		name: 'howKnow',
		required: true,
		isTextArea: true,
		rules: {
			maxLength: {
				value: 1000,
				message: 'Это поле не может быть длиннее 1000 символов'
			}
		}
	},
	{
		label: 'Клуб',
		name: 'club',
		rules: {
			required: {
				value: true,
				message: 'Пожалуйста, выберите вариант!'
			}
		},
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
	},
	{
		name: 'groups',
		label: 'Группы',
		options: [
			{ value: '345', label: 'Группа 345' },
			{ value: '987', label: 'Группа 987' },
			{ value: '433', label: 'Группа 433' }
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
