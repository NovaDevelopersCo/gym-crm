import { applyDecorators } from '@nestjs/common'
import { groupValidation } from '../validation'
import { ApiPropertyOptions, ApiProperty } from '@nestjs/swagger'
import { MaxLength, MinLength, IsString, IsNumber } from 'class-validator'

export class GroupPropertiesSwagger {
	static name_(withValidation?: boolean) {
		const { minLength, maxLength } = groupValidation.name

		const decorators = []

		const validation: ApiPropertyOptions = {}

		if (withValidation) {
			validation.minLength = minLength
			validation.maxLength = maxLength
			decorators.push(
				IsString({ message: 'Название группы должно быть строкой' }),
				MaxLength(maxLength, {
					message: `Максимальная длина названия группы ${maxLength} символов`
				}),
				MinLength(minLength, {
					message: `Минимальная длина названия группы ${minLength} символа`
				})
			)
		}

		return applyDecorators(
			ApiProperty({
				example: 'Группа 1',
				...validation
			}),
			...decorators
		)
	}

	static directionId(withDirection?: boolean) {
		const decorators = []

		if (withDirection) {
			decorators.push(IsNumber({}, { message: 'Id направления должен быть числом ' }))
		}

		return applyDecorators(
			ApiProperty({
				example: 3
			}),
			...decorators
		)
	}
}
