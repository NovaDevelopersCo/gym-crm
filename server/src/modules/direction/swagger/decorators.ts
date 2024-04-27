import { applyDecorators } from '@nestjs/common'
import { directionValidation } from '../validation'
import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger'
import { IsString, MaxLength, MinLength } from 'class-validator'

export class DirectionDecoratorsSwagger {
	static name_(withValidation?: boolean) {
		const { minLength, maxLength } = directionValidation.name

		const decorators = []

		const validation: ApiPropertyOptions = {}

		if (withValidation) {
			validation.minLength = minLength
			validation.maxLength = maxLength

			decorators.push(
				IsString({ message: 'Направление должно быть строкой' }),
				MaxLength(maxLength, {
					message: `Максимальная длина направления ${maxLength} символов`
				}),
				MinLength(minLength, {
					message: `Минимальная длина направления ${minLength} символа`
				})
			)
		}

		return applyDecorators(ApiProperty({ example: 'Кикбоксинг', ...validation }), ...decorators)
	}
}
