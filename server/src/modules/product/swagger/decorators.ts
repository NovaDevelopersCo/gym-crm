import { applyDecorators } from '@nestjs/common'
import { productValidation } from '../validation'
import { ApiPropertyOptions, ApiProperty } from '@nestjs/swagger'
import { MaxLength, MinLength, IsString, IsNumber, IsPositive } from 'class-validator'

export class ProductDecoratorsSwagger {
	static name_(withValidation?: boolean) {
		const { minLength, maxLength } = productValidation.name

		const decorators = []

		const validation: ApiPropertyOptions = {}

		if (withValidation) {
			validation.minLength = minLength
			validation.maxLength = maxLength
			decorators.push(
				IsString({ message: 'Название продукта должно быть строкой' }),
				MaxLength(maxLength, {
					message: `Максимальная длина названия продукта ${maxLength} символов`
				}),
				MinLength(minLength, {
					message: `Минимальная длина названия продукта ${minLength} символа`
				})
			)
		}

		return applyDecorators(
			ApiProperty({
				example: 'Шлем',
				...validation
			}),
			...decorators
		)
	}

	static price(withValidation?: boolean) {
		const decorators = []

		const validation: ApiPropertyOptions = {}

		if (withValidation) {
			decorators.push(
				IsPositive({ message: 'Цена продукта должна быть положительным числом' }),
				IsNumber({}, { message: 'Цена продукта должно быть числом' })
			)
		}

		return applyDecorators(
			ApiProperty({
				example: 35,
				...validation
			}),
			...decorators
		)
	}
}
