import type { RegisterOptions } from 'react-hook-form'

import { TOption } from '@shared/ui'

type TThirdClientsInfoFileds =
	| 'abonement'
	| 'when_purchased'
	| 'when_expires'
	| 'clients_notes'
	| 'administration_notes'

type thirdClientInfoItem = {
	label: string
	name: TThirdClientsInfoFileds
	options?: TOption[]
	type?: 'text' | 'date'
	required?: boolean
	rules?: RegisterOptions
	isDatepicker?: boolean
}

export const thirdClientInfo: thirdClientInfoItem[] = [
	{
		label: 'Абонемент',
		name: 'abonement',
		type: 'text',
		required: true,
		options: [
			{
				value: 'not_present',
				label: 'Не куплен'
			},
			{
				value: 'present',
				label: 'Куплен'
			},
			{
				value: 'expires',
				label: 'Истекает'
			},
			{
				value: 'expired',
				label: 'Истёк'
			}
		]
	},
	{
		name: 'when_purchased',
		label: 'Куплен:',
		type: 'date',
		required: false,
		isDatepicker: true
	},
	{
		name: 'when_expires',
		label: 'Истечёт:',
		type: 'date',
		required: false,
		isDatepicker: true
	},
	{
		label: '*Примечания клиентов',
		name: 'clients_notes',
		type: 'text',
		required: false
	},
	{
		label: '*Примечания администрации',
		name: 'administration_notes',
		type: 'text',
		required: false
	}
]
