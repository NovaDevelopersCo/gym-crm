import { HTMLInputTypeAttribute } from 'react'
import type { RegisterOptions } from 'react-hook-form'

import { TInputProps, TOption } from '@/shared'
import { IClient } from '@/store'

type TClientsInfoFields = keyof IClient

type clientInfoItem = TInputProps & {
	label: string
	name: TClientsInfoFields
	type?: HTMLInputTypeAttribute | 'select'
	options?: TOption[]
	required?: boolean
	rules?: RegisterOptions
}

export const clientInfo: clientInfoItem[] = [
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
	// {
	// 	label: 'Номер карты',
	// 	name: 'card',
	// 	type: 'number',
	// 	required: false,
	// 	rules: {
	// 		pattern: {
	// 			value: /^[0-9]{13,16}/,
	// 			message: 'номер карты должен быть в формате XXXX-XXXX-XXXX-XXXX'
	// 		}
	// 	}
	// },
	{
		name: 'birthday',
		label: 'Дата рождения:',
		type: 'date',
		required: false,
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
		label: 'Номер телефона',
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
	// {
	// 	label: 'Абонемент',
	// 	name: 'abonement',
	// 	type: 'text',
	// 	required: true,
	// 	options: [
	// 		{
	// 			value: 'not_present',
	// 			label: 'Не куплен'
	// 		},
	// 		{
	// 			value: 'present',
	// 			label: 'Куплен'
	// 		},
	// 		{
	// 			value: 'expires',
	// 			label: 'Истекает'
	// 		},
	// 		{
	// 			value: 'expired',
	// 			label: 'Истёк'
	// 		}
	// 	]
	// },
	{
		label: 'Инстаграм',
		name: 'instagram',
		type: 'text',
		required: true,
		rules: {
			pattern: {
				value: /^(?:http(?:s)?:\/\/)?(?:www\.)?instagram\.com\/([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\.(?!\.))){0,28}(?:[A-Za-z0-9_]))?)/i,
				message: 'Ссылка должна быть в формате: instagram.com/профиль'
			}
		}
	},
	// {
	// 	label: 'Телеграм',
	// 	name: 'telegram',
	// 	type: 'text',
	// 	required: true,
	// 	rules: {
	// 		pattern: {
	// 			value: /^@[a-z0-9]+$/i,
	// 			message: 'Аккаунт должен быть в формате: @профиль'
	// 		}
	// 	}
	// },
	// {
	// 	name: 'when_purchased',
	// 	label: 'Куплен:',
	// 	type: 'date',
	// 	required: false,
	// 	rules: {
	// 		pattern: {
	// 			value: /^(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))/i,
	// 			message: 'Введён некорректный формат даты'
	// 		},
	// 		maxLength: {
	// 			value: 10,
	// 			message: 'Это поле не может быть длиннее'
	// 		}
	// 	}
	// },
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
	// {
	// 	label: 'Тренер',
	// 	name: 'trainer',
	// 	type: 'select',
	// 	required: false
	// },
	// {
	// 	name: 'when_expires',
	// 	label: 'Истечёт:',
	// 	type: 'date',
	// 	required: false,
	// 	rules: {
	// 		pattern: {
	// 			value: /^(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))/i,
	// 			message: 'Введён некорректный формат даты'
	// 		},
	// 		maxLength: {
	// 			value: 10,
	// 			message: 'Это поле не может быть длиннее'
	// 		}
	// 	}
	// },
	{
		label: 'Группа',
		name: 'groups',
		type: 'select',
		required: false
	},
	// {
	// 	name: 'status',
	// 	label: 'Статус',
	// 	type: 'text',
	// 	required: true
	// },
	// {
	// 	label: '*Примечания клиентов',
	// 	name: 'clients_notes',
	// 	type: 'text',
	// 	required: false
	// },
	{
		label: 'Клубы',
		name: 'club',
		type: 'select'
	},
	// {
	// 	label: 'Дисциплина',
	// 	name: 'discipline',
	// 	type: 'select'
	// },
	// {
	// 	label: '*Примечания администрации',
	// 	name: 'administration_notes',
	// 	type: 'text',
	// 	required: false
	// },
	{
		label: 'Как узнали',
		name: 'howKnow',
		type: 'text'
	}
]
