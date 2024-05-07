import { propertiesSwagger } from '@/core/utils'
import { abonementValidation, userAbonementValidation } from '../validation'
import { MaxLength, MinLength, Min, Max, IsString, IsInt } from 'class-validator'
import { DurationValidate } from '../decorators'
import { UserAbonementUser } from '@/modules/user/swagger'
import { Trim } from '@/core/decorators'
import { ClubEntity } from '@/modules/club/entities'
import { UserAbonementEntity } from '../entities'

export class AbonementDtoSwagger {
	static name_() {
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

	static price() {
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

	static count() {
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

	static duration() {
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

	static start() {
		return propertiesSwagger({
			example: '2024-05-01',
			...userAbonementValidation.start
		})
	}

	static end() {
		return propertiesSwagger({
			example: '2025-06-09',
			...userAbonementValidation.end
		})
	}

	static isFinish() {
		return propertiesSwagger({
			example: false
		})
	}

	static user() {
		return propertiesSwagger({
			type: UserAbonementUser
		})
	}

	static clubs() {
		return propertiesSwagger({
			type: () => ClubEntity,
			isArray: true
		})
	}

	static userAbonements() {
		return propertiesSwagger({
			type: () => UserAbonementEntity,
			isArray: true
		})
	}

	static abonementId() {
		return propertiesSwagger({
			example: 9,
			description: 'Id абонемента',
			decorators: [IsInt({ message: 'Id абонемента должен быть числом' })]
		})
	}

	static userId() {
		return propertiesSwagger({
			example: 12,
			description: 'Id посетителя',
			decorators: [IsInt({ message: 'Id посетителя должен быть числом' })]
		})
	}
}
