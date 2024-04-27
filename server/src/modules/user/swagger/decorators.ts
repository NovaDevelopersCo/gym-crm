import { applyDecorators } from '@nestjs/common'
import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger'
import {
	IsPhoneNumber,
	MinLength,
	MaxLength,
	IsString,
	IsOptional,
	IsDateString
} from 'class-validator'
import { userValidation } from '../validation'

export class UserDecoratorsSwagger {
	static phone(withValidation?: boolean) {
		const decorators = [ApiProperty({ example: '79003001122' })]

		if (withValidation) {
			decorators.push(IsPhoneNumber('RU', { message: 'Некорректный номер' }))
		}

		return applyDecorators(...decorators)
	}

	static fio(withValidation?: boolean) {
		const { minLength, maxLength } = userValidation.fio

		const decorators = []

		const validation: ApiPropertyOptions = {}

		if (withValidation) {
			validation.minLength = minLength
			validation.maxLength = maxLength
			decorators.push(
				MinLength(minLength, { message: `Минимальная длина фио ${minLength} символа` }),
				MaxLength(maxLength, { message: `Максимальная длина фио ${maxLength} символов` }),
				IsString({ message: 'ФИО должно быть строкой' })
			)
		}

		return applyDecorators(
			ApiProperty({ example: 'Иванов Иван Иванович', ...validation }),
			...decorators
		)
	}

	static birthday(withValidation?: boolean) {
		const decorators = [
			ApiProperty({
				required: false,
				example: '2021-04-19'
			})
		]

		if (withValidation) {
			decorators.push(
				IsOptional(),
				IsDateString({}, { message: 'День рождение должен быть ISO формата (yyyy-mm-dd)' })
			)
		}

		return applyDecorators(...decorators)
	}

	static howKnow(withValidation?: boolean) {
		const { maxLength } = userValidation.howKnow

		const decorators = []

		const validation: ApiPropertyOptions = {}

		if (withValidation) {
			validation.maxLength = maxLength
			decorators.push(
				IsOptional(),
				IsString({ message: 'howKnow должно быть строкой' }),
				MaxLength(maxLength, {
					message: `Максимальная длина как узнали о нас ${maxLength} символов`
				})
			)
		}

		return applyDecorators(
			ApiProperty({
				required: false,
				example: 'Посоветовал друг, увидел в интернете',
				...validation
			}),
			...decorators
		)
	}

	static instagram(withValidation?: boolean) {
		const { maxLength, minLength } = userValidation.instagram
		const decorators = []

		const validation: ApiPropertyOptions = {}

		if (withValidation) {
			validation.maxLength = maxLength
			validation.minLength = minLength
			decorators.push(
				IsOptional(),
				IsString({ message: 'Аккаунт инстаграм должен быть строкой' }),
				MinLength(minLength, {
					message: `Минимальная длина аккаунта в инстаграм ${minLength} символов`
				}),
				MaxLength(maxLength, {
					message: `Максимальная длина аккаунта в инстаграм ${maxLength} символов`
				})
			)
		}

		return applyDecorators(
			ApiProperty({
				example: 'my_account',
				required: false,
				...validation
			}),
			...decorators
		)
	}
}
