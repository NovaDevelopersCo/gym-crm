import {
	IsPhoneNumber,
	MinLength,
	MaxLength,
	IsString,
	IsDateString,
	IsInt,
	Max
} from 'class-validator'
import { userValidation } from '../validation'
import { Property } from '@/core/utils'
import { Trim } from '@/core/decorators'
import { UserAbonementEntity } from '@/modules/abonement/entities'
import { OrderEntity } from '@/modules/order/entities'
import { ClubEntity } from '@/modules/club/entities'
import { GroupEntity } from '@/modules/group/entities'
import { Type } from 'class-transformer'

export class UserPropertiesSwagger {
	public static phone(validation?: boolean) {
		return new Property({
			example: '79003001122',
			description: 'Телефон',
			decorators: [IsPhoneNumber('RU', { message: 'Некорректный номер' })],
			validation
		}).exec()
	}

	public static fio(validation?: boolean) {
		const { minLength, maxLength } = userValidation.fio

		return new Property({
			example: 'Иванов Иван Иванович',
			decorators: [
				IsString({ message: 'ФИО должно быть строкой' }),
				Trim(),
				MinLength(minLength, {
					message: `Минимальная длина фио ${minLength} символа`
				}),
				MaxLength(maxLength, {
					message: `Максимальная длина фио ${maxLength} символов`
				})
			],
			description: 'Ф.И.О.',
			...userValidation.fio,
			validation
		}).exec()
	}

	public static birthday(validation?: boolean) {
		return new Property({
			example: '2021-04-19',
			description: 'Дата рождения',
			decorators: [
				IsDateString({}, { message: 'День рождение должен быть ISO формата (yyyy-mm-dd)' })
			],
			validation
		}).exec()
	}

	public static howKnow(validation?: boolean) {
		const { maxLength } = userValidation.howKnow

		return new Property({
			example: 'Посоветовал друг, увидел в интернете',
			...userValidation.howKnow,
			description: 'Как вы узнали о нас?',
			decorators: [
				IsString({ message: 'howKnow должно быть строкой' }),
				MaxLength(maxLength, {
					message: `Максимальная длина как узнали о нас ${maxLength} символов`
				})
			],
			validation
		}).exec()
	}

	public static instagram(validation?: boolean) {
		const { maxLength, minLength } = userValidation.instagram

		return new Property({
			example: 'my_account',
			description: 'Инстаграм',
			decorators: [
				IsString({ message: 'Аккаунт инстаграм должен быть строкой' }),
				Trim(),
				MinLength(minLength, {
					message: `Минимальная длина аккаунта в инстаграм ${minLength} символов`
				}),
				MaxLength(maxLength, {
					message: `Максимальная длина аккаунта в инстаграм ${maxLength} символов`
				})
			],
			validation,
			...userValidation.instagram
		}).exec()
	}

	public static fromBirthday() {
		return new Property({
			example: '1990-05-01',
			description: 'Фильтрация по дате рождения, от какой даты',
			required: false,
			decorators: [IsDateString({}, { message: 'должен быть ISO формата (yyyy-mm-dd)' })],
			validation: true
		}).exec()
	}

	public static fromDateRegistration() {
		return new Property({
			example: '1990-05-01',
			description: 'Фильтрация по дате регистрации, от какой даты',
			required: false,
			decorators: [IsDateString({}, { message: 'должен быть ISO формата (yyyy-mm-dd)' })],
			validation: true
		}).exec()
	}

	public static queryPhone() {
		return new Property({
			example: '79003001122',
			description: 'Номер телефона',
			required: false,
			decorators: [IsInt(), Max(userValidation.phone.max), Type(() => Number)],
			validation: true
		}).exec()
	}

	public static groupIds() {
		return new Property({
			example: [3, 5, 8],
			description: 'Группы',
			decorators: [IsInt({ each: true, message: 'Id групп должны быть числом' })],
			validation: true
		}).exec()
	}

	public static abonements() {
		return new Property({
			description: 'Абонементы',
			type: () => UserAbonementEntity,
			isArray: true
		}).exec()
	}

	public static orders() {
		return new Property({
			description: 'Заказы',
			type: () => OrderEntity
		}).exec()
	}

	public static club() {
		return new Property({
			description: 'Клуб',
			type: () => ClubEntity
		}).exec()
	}

	public static groups() {
		return new Property({
			description: 'Группы',
			type: () => GroupEntity,
			isArray: true
		}).exec()
	}
}
