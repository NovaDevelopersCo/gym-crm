import { ClubEntity } from '@/modules/club/entities'
import { Property } from '@/core/utils'
import { abonementValidation } from '../validation'
import {
	MaxLength,
	MinLength,
	Min,
	Max,
	IsString,
	IsInt,
	ArrayMinSize,
	IsBooleanString
} from 'class-validator'
import { DurationValidate } from '../decorators'
import { Trim } from '@/core/decorators'
import { AbonementEntity, UserAbonementEntity } from '../entities'
import { UserEntity } from '@/modules/user/entities'

export class AbonementPropertiesSwagger {
	public static name_(validation?: boolean) {
		const { minLength, maxLength } = abonementValidation.name

		return new Property({
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
			],
			validation
		}).exec()
	}

	public static price(validation?: boolean) {
		const { minimum, maximum } = abonementValidation.price

		return new Property({
			example: 1200,
			description: 'Цена абонемента',
			...abonementValidation.price,
			decorators: [
				IsInt({ message: 'Цена абонемента должна быть числом' }),
				Min(minimum, { message: `Минимальная цена абонемента ${minimum}` }),
				Max(maximum, { message: `Максимальная цена абонемента ${maximum}` })
			],
			validation
		}).exec()
	}

	public static count(validation?: boolean) {
		const { minimum, maximum } = abonementValidation.count

		return new Property({
			example: 8,
			description: 'Количество занятий в абонементе',
			...abonementValidation.count,
			decorators: [
				IsInt({ message: 'Количество занятий должно быть числом' }),
				Min(minimum, { message: `Минимальное количество занятий ${minimum}` }),
				Max(maximum, { message: `Максимальное количество занятий ${maximum}` })
			],
			validation
		}).exec()
	}

	public static duration(validation?: boolean) {
		const { minLength, maxLength } = abonementValidation.duration

		return new Property({
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
			],
			validation
		}).exec()
	}

	public static clubIds(validation?: boolean) {
		const { minItems } = abonementValidation.clubs

		return new Property({
			example: [1, 7, 10],
			...abonementValidation.clubs,
			description: 'Клубы в которых действует абонемент',
			decorators: [
				IsInt({ each: true, message: 'Id клубов должны быть числом' }),
				ArrayMinSize(minItems, {
					message: `Массив клубов должен содержать не меньше ${minItems} элементов`
				})
			],
			validation
		}).exec()
	}

	public static isFinishQuery() {
		return new Property({
			required: false,
			example: false,
			decorators: [
				IsBooleanString({
					message: 'Статус окончание абонемента должен быть булевой строкой'
				})
			],
			description: 'Статус окончания абонемента'
		}).exec()
	}

	public static abonementId() {
		return new Property({
			example: 9,
			description: 'Id абонемента',
			decorators: [IsInt({ message: 'Id абонемента должен быть числом' })],
			validation: true
		}).exec()
	}

	public static userId() {
		return new Property({
			example: 12,
			description: 'Id посетителя',
			decorators: [IsInt({ message: 'Id посетителя должен быть числом' })],
			validation: true
		}).exec()
	}

	public static userAbonements() {
		return new Property({
			description: 'Абонементы посетителей',
			type: () => UserAbonementEntity,
			isArray: true
		}).exec()
	}

	public static clubs() {
		return new Property({
			description: 'Клубы в которых действует абонемент',
			type: () => ClubEntity,
			isArray: true
		}).exec()
	}
	public static start() {
		return new Property({
			example: '2024-05-01',
			description: 'Дата начала действия абонемента',
			nullable: true
		}).exec()
	}

	public static end() {
		return new Property({
			example: '2024-09-01',
			description: 'Дата окончания действия абонемента',
			nullable: true
		}).exec()
	}

	public static isFinish() {
		return new Property({
			example: false,
			description: 'Статус окончания абонемента'
		}).exec()
	}

	public static abonement() {
		return new Property({
			description: 'Абонемент',
			type: () => AbonementEntity
		}).exec()
	}

	public static user() {
		return new Property({
			description: 'Пользователь',
			type: () => UserEntity
		}).exec()
	}
}
