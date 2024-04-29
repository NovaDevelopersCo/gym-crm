import { HTMLInputTypeAttribute } from 'react'
import type { RegisterOptions } from 'react-hook-form'

import { CreateGroupDto } from '@/store'

type TCreateGroupItem = {
	label: string
	type: HTMLInputTypeAttribute
	name: keyof CreateGroupDto
	required?: boolean
	rules?: RegisterOptions
}

export const createGroupFields: TCreateGroupItem[] = [
	{
		label: 'Название группы',
		name: 'name',
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
		type: 'select',
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
		type: 'select',
		rules: {
			required: {
				value: true,
				message: 'Пожалуйста, выберите вариант!'
			}
		}
	}
]
