import {
	registerDecorator,
	ValidationArguments,
	maxLength as maxLengthValidation,
	min as minValidation,
	max as maxValidation
} from 'class-validator'
import { ETypeSearch, type TQuerySearchBody, type TQuerySearchValidatorObj } from '@/core/types'

type ArgsObject = { q: string; searchBy: string }
class Validation {
	private validator: TQuerySearchBody
	private result: string = ''

	constructor(private args: ValidationArguments) {
		const { q, searchBy } = args?.object as ArgsObject
		this.validator = args?.constraints[0][searchBy]
		if (this.validator && q.length) {
			this.mainValidation(q)
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
			this.result = "Параметр 'Поиск' должен быть boolean-string"
		}
	}

	private validationNumber(q: string) {
		const number = Number(q)
		if (!Number.isInteger(number)) {
			this.result = `Параметр 'Поиск' должен быть числом`
			return
		}

		const { min, max } = this.validator
		if (min) {
			if (!minValidation(number, min)) {
				this.result = `Параметр 'Поиск' должен быть больше ${min}`
				return
			}
		}

		if (max) {
			if (!maxValidation(number, max)) {
				this.result = `Параметр 'Поиск' должен быть меньше ${max}`
			}
		}
	}

	private mainValidation(q: string) {
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

	public execute() {
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
