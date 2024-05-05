import {
	registerDecorator,
	ValidationArguments,
	maxLength as maxLengthValidation,
	min as minValidation,
	max as maxValidation
} from 'class-validator'
import { ETypeSearch, type TQuerySearchBody, type TQuerySearchValidatorObj } from '@/core/types'

class Validation {
	private validator: TQuerySearchBody
	private result: string = ''

	constructor(private args: ValidationArguments) {
		const { q, searchBy } = args?.object as { q?: string; searchBy?: string }
		const { object } = args
		this.validator = args?.constraints[0][searchBy]

		if (this.validator && q.length) {
			this.mainValidation(object as { q: string; searchBy: string })
		}
	}

	private validationString(q: string) {
		const { maxLength } = this.validator
		if (maxLength) {
			if (!maxLengthValidation(q, maxLength)) {
				this.result = `Параметр 'Поиск' должен быть меньше ${maxLength} символов`
			}
		}
	}

	private validationBoolean(q: string) {
		if (!['true', 'false'].includes(q)) {
			this.result = "Параметр 'Поиск' должен быть boolean"
		}
	}

	private validationNumber(q: string) {
		if (!Number.isInteger(+q)) {
			this.result = `Параметр 'Поиск' должен быть числом`
			return
		}

		const { min, max } = this.validator

		if (min) {
			if (!minValidation(q, min)) {
				this.result = `Параметр 'Поиск' должен быть больше ${min}`
				return
			}
		}

		if (max) {
			if (!maxValidation(q, max)) {
				this.result = `Параметр 'Поиск' должен быть меньше ${max}`
			}
		}
	}

	private mainValidation({ q }: { q: string; searchBy: string }) {
		const { type = ETypeSearch.STRING } = this.validator

		switch (type) {
			case ETypeSearch.STRING:
				this.validationString(q)
				break
			case ETypeSearch.NUMBER:
				this.validationNumber(q)
				break
			case ETypeSearch.BOOLEAN:
				this.validationBoolean(q)
				break
		}
	}

	execute() {
		return this.result
	}
}

//!! add only to searchBy property into find-all dto
export const QuerySearchValidate =
	(validator?: TQuerySearchValidatorObj) => (object: object, propertyName: string) => {
		let validationMessage = ''

		return registerDecorator({
			name: 'querySearchValidate',
			target: object.constructor,
			propertyName,
			constraints: [validator],
			options: {},
			validator: {
				validate: (_, args?: ValidationArguments) => {
					validationMessage = new Validation(args).execute()

					return validationMessage.length === 0
				},
				defaultMessage: () => validationMessage
			}
		})
	}
