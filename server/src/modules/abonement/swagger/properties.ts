import { propertiesSwagger } from '@/core/utils'
import { abonementValidation } from '../validation'
import { MaxLength, MinLength, Min, Max, IsOptional, IsNumber, IsString } from 'class-validator'

export class AbonementPropertiesSwagger {
	static name_(withValidation?: boolean) {
		const { minLength, maxLength } = abonementValidation.name

		return propertiesSwagger({
			example: 'Групповой',
			validation: withValidation ? abonementValidation.name : {},
			decorators: withValidation
				? [
						IsString({ message: 'Название абонемента должно быть строкой' }),
						MinLength(minLength, {
							message: `Минимальная длина названия абонемента ${minLength} символов`
						}),
						MaxLength(maxLength, {
							message: `Максимальная длина названия абонемента ${maxLength} символов`
						})
					]
				: []
		})
	}

	static price(withValidation?: boolean) {
		const { minimum, maximum } = abonementValidation.price

		return propertiesSwagger({
			example: 1200,
			validation: withValidation ? abonementValidation.price : {},
			decorators: withValidation
				? [
						IsNumber({}, { message: 'Цена абонемента должна быть числом' }),
						Min(minimum, { message: `Минимальная цена абонемента ${minimum}` }),
						Max(maximum, { message: `Максимальная цена абонемента ${maximum}` })
					]
				: []
		})
	}

	static count(withValidation?: boolean) {
		const { minimum, maximum, nullable } = abonementValidation.count

		return propertiesSwagger({
			example: 8,
			validation: withValidation ? abonementValidation.count : { nullable },
			decorators: withValidation
				? [
						IsNumber({}, { message: 'Количество занятий должно быть числом' }),
						Min(minimum, { message: `Минимальное количество занятий ${minimum}` }),
						Max(maximum, { message: `Максимальное количество занятий ${maximum}` }),
						IsOptional()
					]
				: []
		})
	}

	static duration(withValidation?: boolean) {
		const { minLength, maxLength, nullable } = abonementValidation.duration

		return propertiesSwagger({
			example: '1m.',
			validation: withValidation ? abonementValidation.duration : { nullable },
			decorators: withValidation
				? [
						IsString({ message: 'Длительность абонемента должна быть строкой' }),
						MinLength(minLength, {
							message: `Минимальная длина длительности абонемента ${minLength} символов`
						}),
						MaxLength(maxLength, {
							message: `Максимальная длина длительности абонемента ${maxLength} символов`
						}),
						IsOptional()
					]
				: []
		})
	}
}
