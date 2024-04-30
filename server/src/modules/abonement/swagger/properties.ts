import { applyDecorators } from '@nestjs/common'
import { abonementValidation } from '../validation'
import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger'
import { MaxLength, MinLength, Min, Max, IsOptional, IsNumber, IsString } from 'class-validator'

export class AbonementPropertiesSwagger {
	static name_(withValidation?: boolean) {
		const decorators = []

		const { minLength, maxLength } = abonementValidation.name

		const validations: ApiPropertyOptions = {}

		if (withValidation) {
			validations.minLength = minLength
			validations.maxLength = maxLength
			decorators.push(
				IsString({ message: 'Название абонемента должно быть строкой' }),
				MinLength(minLength, {
					message: `Минимальная длина названия абонемента ${minLength} символов`
				}),
				MaxLength(maxLength, {
					message: `Максимальная длина названия абонемента ${maxLength} символов`
				})
			)
		}

		return applyDecorators(ApiProperty({ example: 'Групповой', ...validations }), ...decorators)
	}

	static price(withValidation?: boolean) {
		const decorators = []

		const { minimum, maximum } = abonementValidation.price

		const validations: ApiPropertyOptions = {}

		if (withValidation) {
			validations.minimum = minimum
			validations.maximum = maximum
			decorators.push(
				IsNumber({}, { message: 'Цена абонемента должна быть числом' }),
				Min(minimum, { message: `Минимальная цена абонемента ${minimum}` }),
				Max(maximum, { message: `Максимальная цена абонемента ${maximum}` })
			)
		}

		return applyDecorators(ApiProperty({ example: 1200, ...validations }), ...decorators)
	}

	static count(withValidation?: boolean) {
		const decorators = [IsOptional()]

		const { minimum, maximum, required, nullable } = abonementValidation.count

		const validations: ApiPropertyOptions = {
			nullable
		}

		if (withValidation) {
			validations.minimum = minimum
			validations.maximum = maximum
			validations.required = required

			decorators.push(
				IsNumber({}, { message: 'Количество занятий должно быть числом' }),
				Min(minimum, { message: `Минимальное количество занятий ${minimum}` }),
				Max(maximum, { message: `Максимальное количество занятий ${maximum}` })
			)

			if (required === false) {
				decorators.push(IsOptional())
			}
		}

		return applyDecorators(ApiProperty({ example: 8, ...validations }), ...decorators)
	}

	static duration(withValidation?: boolean) {
		const { minLength, maxLength, required, nullable } = abonementValidation.duration

		const decorators = []

		const validations: ApiPropertyOptions = {
			nullable
		}

		if (withValidation) {
			validations.minLength = minLength
			validations.maxLength = maxLength
			validations.required = required

			decorators.push(
				IsString({ message: 'Длительность абонемента должна быть строкой' }),
				MinLength(minLength, {
					message: `Минимальная длина длительности абонемента ${minLength} символов`
				}),
				MaxLength(maxLength, {
					message: `Максимальная длина длительности абонемента ${maxLength} символов`
				})
			)

			if (required === false) {
				decorators.push(IsOptional())
			}
		}

		return applyDecorators(ApiProperty({ example: '1m.', ...validations }), ...decorators)
	}
}
