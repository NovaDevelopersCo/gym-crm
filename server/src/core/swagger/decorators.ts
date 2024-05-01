import { applyDecorators } from '@nestjs/common'
import { ApiProperty, type ApiPropertyOptions } from '@nestjs/swagger'
import { IsString, MinLength, MaxLength, IsEmail, IsInt } from 'class-validator'

export class CommonDecoratorsSwagger {
	static password(withValidation?: boolean) {
		const minLength = 8
		const maxLength = 32

		const validation: ApiPropertyOptions = {}

		const decorators = []

		if (withValidation) {
			validation.minLength = minLength
			validation.maxLength = maxLength
			decorators.push(
				IsString({ message: 'Пароль должен быть строкой' }),
				MinLength(minLength, {
					message: `Минимальная длина пароля ${minLength} символов`
				}),
				MaxLength(maxLength, {
					message: `Максимальная длина пароля ${maxLength} символа`
				})
			)
		}

		decorators.push(
			ApiProperty({
				example: 'password',
				...validation
			})
		)

		return applyDecorators(...decorators)
	}

	static email(withValidation?: boolean) {
		const maxLength = 200

		const decorators = []

		const validation: ApiPropertyOptions = {}

		if (withValidation) {
			validation.maxLength = maxLength

			decorators.push(
				IsEmail({}, { message: 'Невалидная почта' }),
				MaxLength(maxLength, { message: `Максимальная длина почты ${maxLength} символов` })
			)
		}

		return applyDecorators(
			ApiProperty({
				example: 'email@email.com',
				...validation
			}),
			...decorators
		)
	}

	static id(withValidation?: boolean) {
		const decorators = [ApiProperty({ example: 1 })]

		if (withValidation) {
			decorators.push(IsInt({ message: 'Id должен быть числом' }))
		}

		return applyDecorators(...decorators)
	}

	static clubId(withValidation?: boolean) {
		const decorators = [ApiProperty({ example: 2 })]

		if (withValidation) {
			decorators.push(IsInt({ message: 'Id клуба должен быть числом' }))
		}

		return applyDecorators(...decorators)
	}

	static userId(withValidation?: boolean) {
		const decorators = [ApiProperty({ example: 2 })]

		if (withValidation) {
			decorators.push(IsInt({ message: 'Id пользователя должен быть числом' }))
		}

		return applyDecorators(...decorators)
	}

	static groupIds(withValidation?: boolean) {
		const decorators = [
			ApiProperty({
				example: [3, 5, 6]
			})
		]

		if (withValidation) {
			decorators.push(IsInt({ each: true, message: 'Id групп должны быть числом' }))
		}

		return applyDecorators(...decorators)
	}
}
