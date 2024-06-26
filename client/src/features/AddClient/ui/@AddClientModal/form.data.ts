import type { HTMLInputTypeAttribute } from 'react'
import type { RegisterOptions } from 'react-hook-form'

import type { TOption } from '@/shared'
import type { CreateClientDto } from '@/store'

type TNewClientFormFields = keyof CreateClientDto

type TNewClientFormItem = {
	label: string
	type?: HTMLInputTypeAttribute
	name: TNewClientFormFields
	options?: TOption[]
	required?: boolean
	ismulti?: 'true' | 'false'
	isTextArea?: boolean
	rules?: RegisterOptions
	format?: string
}

export const newClientFormFields: TNewClientFormItem[] = [
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
		name: 'instagram'
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
		}
	},
	{
		name: 'groups',
		label: 'Группы',
		required: true,
		ismulti: 'true'
	}
	// {
	// 	label: 'Комментарий',
	// 	type: 'text',
	// 	name: 'commentary',
	// 	isTextArea: true,
	// 	rules: {
	// 		maxLength: {
	// 			value: 1000,
	// 			message: 'Это поле не можем быть длиннее 1000 символов'
	// 		}
	// 	}
	// }
]
