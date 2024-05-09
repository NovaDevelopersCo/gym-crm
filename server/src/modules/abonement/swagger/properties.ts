import { propertiesSwagger } from '@/core/utils'
import { abonementValidation } from '../validation'
import { MaxLength, MinLength, Min, Max, IsString, IsInt, ArrayMinSize } from 'class-validator'
import { DurationValidate } from '../decorators'
import { Trim } from '@/core/decorators'

export class AbonementPropertiesSwagger {
	public static name_() {
		const { minLength, maxLength } = abonementValidation.name

		return propertiesSwagger({
			example: 'Групповой',
			description: 'Название абонемента',
			...abonementValidation.name,
			decorators: [
				IsString({ message: 'Название абонемента должно быть строкой' }),
				Trim(),
				MinLength(minLength, {
					message: `Минимальная длина названия абонемента ${minLength} символов`
				}),
				MaxLength(maxLength, {
					message: `Максимальная длина названия абонемента ${maxLength} символов`
				})
			]
		})
	}

	public static price() {
		const { minimum, maximum } = abonementValidation.price

		return propertiesSwagger({
			example: 1200,
			description: 'Цена абонемента',
			...abonementValidation.price,
			decorators: [
				IsInt({ message: 'Цена абонемента должна быть числом' }),
				Min(minimum, { message: `Минимальная цена абонемента ${minimum}` }),
				Max(maximum, { message: `Максимальная цена абонемента ${maximum}` })
			]
		})
	}

	public static count() {
		const { minimum, maximum } = abonementValidation.count

		return propertiesSwagger({
			example: 8,
			description: 'Количество занятий в абонементе',
			...abonementValidation.count,
			decorators: [
				IsInt({ message: 'Количество занятий должно быть числом' }),
				Min(minimum, { message: `Минимальное количество занятий ${minimum}` }),
				Max(maximum, { message: `Максимальное количество занятий ${maximum}` })
			]
		})
	}

	public static duration() {
		const { minLength, maxLength } = abonementValidation.duration

		return propertiesSwagger({
			example: '1m.',
			description: 'Длительность абонемента',
			...abonementValidation.duration,
			decorators: [
				IsString({ message: 'Длительность абонемента должна быть строкой' }),
				Trim(),
				DurationValidate,
				MinLength(minLength, {
					message: `Минимальная длина длительности абонемента ${minLength} символов`
				}),
				MaxLength(maxLength, {
					message: `Максимальная длина длительности абонемента ${maxLength} символов`
				})
			]
		})
	}

	public static clubs() {
		const { minItems } = abonementValidation.clubs

		return propertiesSwagger({
			example: [1, 7, 10],
			...abonementValidation.clubs,
			description: 'Клубы в которых действует абонемент',
			decorators: [
				IsInt({ each: true, message: 'Id клубов должны быть числом' }),
				ArrayMinSize(minItems, {
					message: `Массив клубов должен содержать не меньше ${minItems} элементов`
				})
			]
		})
	}

	public static abonementId() {
		return propertiesSwagger({
			example: 9,
			description: 'Id абонемента',
			decorators: [IsInt({ message: 'Id абонемента должен быть числом' })]
		})
	}

	public static userId() {
		return propertiesSwagger({
			example: 12,
			description: 'Id посетителя',
			decorators: [IsInt({ message: 'Id посетителя должен быть числом' })]
		})
	}
}
