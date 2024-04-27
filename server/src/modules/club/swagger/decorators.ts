import { applyDecorators } from '@nestjs/common'
import { clubValidation } from '../validation'
import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger'
import { IsString, MinLength, MaxLength, IsNumber, ArrayMaxSize } from 'class-validator'

export class ClubDecoratorsSwagger {
	static name_(withValidation?: boolean) {
		const { minLength, maxLength } = clubValidation.name

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
		const { minlength, maxLength } = clubValidation.address

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
		const { arrayMaxSize } = clubValidation.admins

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
