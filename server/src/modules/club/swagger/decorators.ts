import { applyDecorators } from '@nestjs/common'
import { clubConfig } from '../config'
import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger'
import { IsString, MinLength, MaxLength, IsNumber, ArrayMaxSize } from 'class-validator'

export class ClubDecoratorsSwagger {
	static name_(withValidation?: boolean) {
		const { minLength, maxLength } = clubConfig.name

		const validations: ApiPropertyOptions = {}

		const decorators = []

		if (withValidation) {
			validations.minLength = minLength
			validations.maxLength = maxLength

			decorators.push(
				IsString({ message: 'Название клуба должно быть строкой' }),
				MinLength(minLength, {
					message: `Минимальная длина названия клуба ${minLength} символа`
				}),
				MaxLength(maxLength, {
					message: `Максимальная длина названия клуба ${maxLength} символов`
				})
			)
		}

		return applyDecorators(
			ApiProperty({
				example: 'Mass Club',
				...validations
			}),
			...decorators
		)
	}

	static address(withValidation?: boolean) {
		const { minlength, maxLength } = clubConfig.address

		const validations: ApiPropertyOptions = {}

		const decorators = []

		if (withValidation) {
			validations.minLength = minlength
			validations.maxLength = maxLength

			decorators.push(
				IsString({ message: 'Адрес клуба должен быть строкой' }),
				MinLength(minlength, {
					message: `Минимальная длина названия клуба должна быть ${minlength} символа`
				}),
				MaxLength(maxLength, {
					message: `Максимальная длина названия клуба должна быть ${maxLength} символов`
				})
			)
		}

		return applyDecorators(
			ApiProperty({
				example: 'г. Москва ул. Шишкина д. 45',
				...validations
			}),
			...decorators
		)
	}

	static admins(withValidation?: boolean) {
		const { arrayMaxSize } = clubConfig.admins

		const decorators = [
			ApiProperty({
				example: [111, 222]
			})
		]

		if (withValidation) {
			decorators.push(
				ArrayMaxSize(arrayMaxSize, {
					message: `У клуба может быть не более ${arrayMaxSize} админов`
				}),
				IsNumber({}, { message: 'Id админа должно быть числом', each: true })
			)
		}

		return applyDecorators(...decorators)
	}
}
