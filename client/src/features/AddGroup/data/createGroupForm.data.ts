// import type { RegisterOptions } from 'react-hook-form'

// import type { TOption } from '@shared/ui'

// type TCreateGroupFields = 'group' | 'direction' | 'club'

// type TCreateGroupItem = {
// 	label: string
// 	type?: 'text'
// 	name: TCreateGroupFields
// 	options?: TOption[]
// 	required?: boolean
// 	rules?: RegisterOptions
// }

export const createGroupFields = [
	{
		label: 'Название группы',
		name: 'group',
		type: 'text',
		rules: {
			required: {
				value: true,
				message: 'Пожалуйста, заполните это поле!'
			}
		}
	},
	{
		label: 'Направление',
		name: 'direction',
		type: 'text',
		rules: {
			required: {
				value: true,
				message: 'Пожалуйста, заполните это поле!'
			}
		}
	},
	{
		label: 'Клуб',
		name: 'club',
		type: 'text',
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
	}
]
