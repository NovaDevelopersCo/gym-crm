import {
	registerDecorator,
	ValidationArguments,
	maxLength as maxLengthValidation
} from 'class-validator'

import type { TQuerySearchValidatorObj } from '@/core/types'

const validation = (args: ValidationArguments) => {
	const validator = args?.constraints[0]

	const property = args.property

	if (validator && property === 'searchBy') {
		const { q, searchBy } = args?.object as { q?: string; searchBy?: string }

		if (q.length) {
			const { maxLength } = validator[searchBy] as {
				maxLength?: number
			}

			if (maxLength) {
				const isMore = maxLengthValidation(q, maxLength)

				if (!isMore) {
					return `Параметр 'Поиск' должен быть меньше ${maxLength} символов`
				}
			}
		}
	}

	return ''
}

//!! add only to searchBy property into find-all dto

export const QuerySearchValidate =
	<T extends string = ''>(validator?: TQuerySearchValidatorObj<T>) =>
	(object: object, propertyName: string) => {
		let validationMessage = ''

		return registerDecorator({
			name: 'querySearchValidate',
			target: object.constructor,
			propertyName,
			constraints: [validator],
			options: {},
			validator: {
				validate: (_, args?: ValidationArguments) => {
					validationMessage = validation(args)

					return validationMessage.length === 0
				},
				defaultMessage: () => validationMessage
			}
		})
	}
