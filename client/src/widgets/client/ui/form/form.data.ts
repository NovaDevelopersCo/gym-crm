import type { TOption } from '@/shared'

type TNewClientFormFields =
	| 'fio'
	| 'phone'
	| 'email'
	| 'telegram'
	| 'age'
	| 'birthdayDate'
	| 'howDoYouKnow'
	| 'club'
	| 'beforeDirection'
	| 'direction'
	| 'groupIds'

type TNewClientFormItem = {
	label: string
	type?: 'text' | 'number'
	name: TNewClientFormFields
	options?: TOption[]
	required?: boolean
	isMulti?: boolean
	isTextArea?: boolean
}

export const newClientFromItemsArr: TNewClientFormItem[] = [
	{
		label: 'Ф.И.О.',
		name: 'fio',
		type: 'text',
		required: true
	},
	{
		label: 'Номер телефона',
		type: 'number',
		name: 'phone',
		required: true
	},
	{
		label: 'Почта',
		type: 'text',
		name: 'email'
	},
	{
		label: 'Телеграм',
		type: 'text',
		name: 'telegram'
	},
	{
		label: 'Возраст',
		type: 'text',
		name: 'age'
	},
	{
		label: 'Дата рождения',
		type: 'text',
		name: 'birthdayDate'
	},
	{
		label: 'Как вы узнали о нас?',
		type: 'text',
		name: 'howDoYouKnow',
		required: true,
		isTextArea: true
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
		isTextArea: true
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
	}
]
