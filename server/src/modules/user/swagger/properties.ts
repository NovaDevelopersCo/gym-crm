import {
	IsPhoneNumber,
	MinLength,
	MaxLength,
	IsString,
	IsOptional,
	IsDateString
} from 'class-validator'
import { userValidation } from '../validation'
import { propertiesSwagger } from '@/core/utils'
import { Trim } from '@/core/decorators'

export class UserPropertiesSwagger {
	static phone(withValidation?: boolean) {
		return propertiesSwagger({
			example: '79003001122',
			decorators: withValidation
				? [IsPhoneNumber('RU', { message: 'Некорректный номер' })]
				: []
		})
	}

	static fio(withValidation?: boolean) {
		const { minLength, maxLength } = userValidation.fio

		return propertiesSwagger({
			example: 'Иванов Иван Иванович',
			decorators: withValidation
				? [
						IsString({ message: 'ФИО должно быть строкой' }),
						Trim(),
						MinLength(minLength, {
							message: `Минимальная длина фио ${minLength} символа`
						}),
						MaxLength(maxLength, {
							message: `Максимальная длина фио ${maxLength} символов`
						})
					]
				: [],
			validation: withValidation ? userValidation.fio : {}
		})
	}

	static birthday(withValidation?: boolean) {
		return propertiesSwagger({
			example: '2021-04-19',
			validation: { required: false },
			decorators: withValidation
				? [
						IsOptional(),
						IsDateString(
							{},
							{ message: 'День рождение должен быть ISO формата (yyyy-mm-dd)' }
						)
					]
				: []
		})
	}

	static howKnow(withValidation?: boolean) {
		const { maxLength } = userValidation.howKnow

		return propertiesSwagger({
			example: 'Посоветовал друг, увидел в интернете',
			validation: withValidation ? userValidation.howKnow : { required: false },
			decorators: withValidation
				? [
						IsOptional(),
						IsString({ message: 'howKnow должно быть строкой' }),
						MaxLength(maxLength, {
							message: `Максимальная длина как узнали о нас ${maxLength} символов`
						})
					]
				: []
		})
	}

	static instagram(withValidation?: boolean) {
		const { maxLength, minLength } = userValidation.instagram

		return propertiesSwagger({
			example: 'my_account',
			decorators: withValidation
				? [
						IsOptional(),
						IsString({ message: 'Аккаунт инстаграм должен быть строкой' }),
						Trim(),
						MinLength(minLength, {
							message: `Минимальная длина аккаунта в инстаграм ${minLength} символов`
						}),
						MaxLength(maxLength, {
							message: `Максимальная длина аккаунта в инстаграм ${maxLength} символов`
						})
					]
				: [],
			validation: withValidation ? userValidation.instagram : {}
		})
	}
}
