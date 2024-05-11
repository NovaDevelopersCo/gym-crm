import { clubValidation } from '../validation'
import { IsString, MinLength, MaxLength, IsInt, ArrayMaxSize } from 'class-validator'
import { Property } from '@/core/utils'
import { Trim } from '@/core/decorators'
import { AbonementEntity } from '@/modules/abonement/entities'
import { ProductEntity } from '@/modules/product/entities'
import { UserEntity } from '@/modules/user/entities'
import { GroupEntity } from '@/modules/group/entities'
import { StaffEntity } from '@/modules/staff/entities'

export class ClubPropertiesSwagger {
	public static name_(validation?: boolean) {
		const { minLength, maxLength } = clubValidation.name

		return new Property({
			example: 'Mass Club',
			description: 'Название клуба',
			...clubValidation.name,
			decorators: [
				IsString({ message: 'Название клуба должно быть строкой' }),
				Trim(),
				MinLength(minLength, {
					message: `Минимальная длина названия клуба ${minLength} символа`
				}),
				MaxLength(maxLength, {
					message: `Максимальная длина названия клуба ${maxLength} символов`
				})
			],
			validation
		}).exec()
	}

	public static address(validation?: boolean) {
		const { minlength, maxLength } = clubValidation.address

		return new Property({
			example: 'г. Москва ул. Шишкина д. 45',
			description: 'Адрес клуба',
			decorators: [
				IsString({ message: 'Адрес клуба должен быть строкой' }),
				MinLength(minlength, {
					message: `Минимальная длина названия клуба должна быть ${minlength} символа`
				}),
				MaxLength(maxLength, {
					message: `Максимальная длина названия клуба должна быть ${maxLength} символов`
				})
			],
			validation,
			...clubValidation.address
		}).exec()
	}

	public static adminIds() {
		const { maxItems } = clubValidation.admins

		return new Property({
			example: [111, 222],
			description: 'Id админов',
			decorators: [
				ArrayMaxSize(maxItems, {
					message: `У клуба может быть не более ${maxItems} админов`
				}),
				IsInt({ message: 'Id админа должно быть числом', each: true })
			],
			...clubValidation.admins,
			validation: true
		}).exec()
	}

	public static abonements() {
		return new Property({
			description: 'Абонементы',
			type: () => AbonementEntity,
			isArray: true
		}).exec()
	}

	public static products() {
		return new Property({
			description: 'Товары',
			type: () => ProductEntity,
			isArray: true
		}).exec()
	}

	public static users() {
		return new Property({
			description: 'Посетители',
			type: () => UserEntity,
			isArray: true
		}).exec()
	}

	public static groups() {
		return new Property({
			description: 'Группы',
			type: () => GroupEntity,
			isArray: true
		}).exec()
	}

	public static admins() {
		return new Property({
			description: 'Администраторы',
			type: () => StaffEntity,
			isArray: true
		}).exec()
	}
}
