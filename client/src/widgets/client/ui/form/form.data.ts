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

type TOption = {
	value: string
	label: string
}

type TNewClientFormItem = {
	label: string
	type?: 'text' | 'number'
	name: TNewClientFormFields
	options?: TOption[]
	required: boolean
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
		name: 'email',
		required: false
	},
	{
		label: 'Телеграм',
		type: 'text',
		name: 'telegram',
		required: false
	},
	{
		label: 'Возраст',
		type: 'text',
		name: 'age',
		required: false
	},
	{
		label: 'Дата рождения',
		type: 'text',
		name: 'birthdayDate',
		required: false
	},
	{
		label: 'Как вы узнали о нас?',
		type: 'text',
		name: 'howDoYouKnow',
		required: true
	},
	{
		label: 'Клуб',
		type: 'text',
		name: 'club',
		options: [
			{
				value: 'Strength Club',
				label: 'Strength Club г. Москва, ул. Колымыкинская'
			}
		],
		required: true
	},
	{
		label: 'Чем вы занимались до?',
		type: 'text',
		name: 'beforeDirection',
		required: true
	},
	{
		label: 'В каких группах вы занимаетесь?',
		type: 'text',
		name: 'groupIds',
		options: [
			{ value: '345', label: 'Группа 345' },
			{ value: '987', label: 'Группа 987' },
			{ value: '433', label: 'Группа 433' }
		],
		required: true
	},
	{
		label: 'Чем занимаетесь сейчас?',
		type: 'text',
		name: 'direction',
		options: [
			{ value: 'Бокс', label: 'Box' },
			{
				value: 'Kickboxing',
				label: 'Kickboxing'
			},
			{
				value: 'Karate',
				label: 'Карате'
			}
		],
		required: true
	}
]
