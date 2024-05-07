import { directionValidation } from '../validation'
import { IsString, MaxLength, MinLength } from 'class-validator'
import { propertiesSwagger } from '@/core/utils'
import { Trim } from '@/core/decorators'

export class DirectionDtoSwagger {
	static name_() {
		const { minLength, maxLength } = directionValidation.name

		return propertiesSwagger({
			example: 'Кикбоксинг',
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
			...directionValidation.name
		})
	}
}
