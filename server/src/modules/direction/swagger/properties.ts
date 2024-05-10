import { directionValidation } from '../validation'
import { IsString, MaxLength, MinLength } from 'class-validator'
import { Property } from '@/core/utils'
import { Trim } from '@/core/decorators'
import { GroupEntity } from '@/modules/group/entities'

export class DirectionPropertiesSwagger {
	public static name_(validation?: boolean) {
		const { minLength, maxLength } = directionValidation.name

		return new Property({
			example: 'Кикбоксинг',
			description: 'Название направления',
			decorators: [
				IsString({ message: 'Направление должно быть строкой' }),
				Trim(),
				MaxLength(maxLength, {
					message: `Максимальная длина направления ${maxLength} символов`
				}),
				MinLength(minLength, {
					message: `Минимальная длина направления ${minLength} символа`
				})
			],
			validation,
			...directionValidation.name
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
