import { IsPhoneNumber, MinLength, MaxLength, IsString, IsDateString, IsInt } from 'class-validator'
import { userValidation } from '../validation'
import { propertiesSwagger } from '@/core/utils'
import { Trim } from '@/core/decorators'

export class UserPropertiesSwagger {
	public static phone() {
		return propertiesSwagger({
			example: '79003001122',
			decorators: [IsPhoneNumber('RU', { message: 'Некорректный номер' })]
		})
	}

	public static fio() {
		const { minLength, maxLength } = userValidation.fio

		return propertiesSwagger({
			example: 'Иванов Иван Иванович',
			decorators: [
				IsString({ message: 'ФИО должно быть строкой' }),
				Trim(),
				MinLength(minLength, {
					message: `Минимальная длина фио ${minLength} символа`
				}),
				MaxLength(maxLength, {
					message: `Максимальная длина фио ${maxLength} символов`
				})
			],
			...userValidation.fio
		})
	}

	public static birthday() {
		return propertiesSwagger({
			example: '2021-04-19',
			decorators: [
				IsDateString({}, { message: 'День рождение должен быть ISO формата (yyyy-mm-dd)' })
			]
		})
	}

	public static howKnow() {
		const { maxLength } = userValidation.howKnow

		return propertiesSwagger({
			example: 'Посоветовал друг, увидел в интернете',
			...userValidation.howKnow,
			decorators: [
				IsString({ message: 'howKnow должно быть строкой' }),
				MaxLength(maxLength, {
					message: `Максимальная длина как узнали о нас ${maxLength} символов`
				})
			]
		})
	}

	public static instagram() {
		const { maxLength, minLength } = userValidation.instagram

		return propertiesSwagger({
			example: 'my_account',
			decorators: [
				IsString({ message: 'Аккаунт инстаграм должен быть строкой' }),
				Trim(),
				MinLength(minLength, {
					message: `Минимальная длина аккаунта в инстаграм ${minLength} символов`
				}),
				MaxLength(maxLength, {
					message: `Максимальная длина аккаунта в инстаграм ${maxLength} символов`
				})
			],
			...userValidation.instagram
		})
	}

	public static groups() {
		return propertiesSwagger({
			example: [3, 5, 8],
			decorators: [IsInt({ each: true, message: 'Id групп должны быть числом' })]
		})
	}
}
