import { groupValidation } from '../validation'
import { MaxLength, MinLength, IsString, IsInt } from 'class-validator'
import { Property } from '@/core/utils'
import { Trim } from '@/core/decorators'
import { DirectionEntity } from '@/modules/direction/entities'
import { ClubEntity } from '@/modules/club/entities'
import { UserEntity } from '@/modules/user/entities'

export class GroupPropertiesSwagger {
	public static name_(validation?: boolean) {
		const { minLength, maxLength } = groupValidation.name

		return new Property({
			example: 'Группа 2',
			...groupValidation.name,
			description: 'Название группы',
			decorators: [
				IsString({ message: 'Название группы должно быть строкой' }),
				Trim(),
				MaxLength(maxLength, {
					message: `Максимальная длина названия группы ${maxLength} символов`
				}),
				MinLength(minLength, {
					message: `Минимальная длина названия группы ${minLength} символа`
				})
			],
			validation
		}).exec()
	}

	public static directionId() {
		return new Property({
			validation: true,
			example: 3,
			description: 'Id направления',
			decorators: [IsInt({ message: 'Id направления должен быть числом' })]
		}).exec()
	}

	public static direction() {
		return new Property({
			description: 'Направление группы',
			type: () => DirectionEntity
		}).exec()
	}

	public static club() {
		return new Property({
			description: 'Клуб, к которому относится группа',
			type: () => ClubEntity
		}).exec()
	}

	public static users() {
		return new Property({
			description: 'Посетители',
			type: () => UserEntity,
			isArray: true
		}).exec()
	}
}
