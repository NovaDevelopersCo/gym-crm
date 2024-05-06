import { propertiesSwagger } from '@/core/utils'
import { abonementValidation, userAbonementValidation } from '../validation'
import { MaxLength, MinLength, Min, Max, IsOptional, IsString, IsInt } from 'class-validator'
import { DurationValidate } from '../decorators'
import { UserAbonementUser } from '@/modules/user/swagger'
import { Trim } from '@/core/decorators'

export class AbonementPropertiesSwagger {
	static name_(withValidation?: boolean) {
		const { minLength, maxLength } = abonementValidation.name

		return propertiesSwagger({
			example: 'Групповой',
			validation: withValidation ? abonementValidation.name : {},
			decorators: withValidation
				? [
						IsString({ message: 'Название абонемента должно быть строкой' }),
						Trim(),
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
						IsInt({ message: 'Цена абонемента должна быть числом' }),
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
						IsOptional(),
						IsInt({ message: 'Количество занятий должно быть числом' }),
						Min(minimum, { message: `Минимальное количество занятий ${minimum}` }),
						Max(maximum, { message: `Максимальное количество занятий ${maximum}` })
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
						IsOptional(),
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
				: []
		})
	}

	static start() {
		return propertiesSwagger({
			example: '2024-05-01',
			validation: userAbonementValidation.start
		})
	}

	static end() {
		return propertiesSwagger({
			example: '2025-06-09',
			validation: userAbonementValidation.end
		})
	}

	static isFinish() {
		return propertiesSwagger({
			example: false
		})
	}

	static user() {
		return propertiesSwagger({
			validation: {
				type: UserAbonementUser
			}
		})
	}
}
