import { directionValidation } from '../validation'
import { IsString, MaxLength, MinLength } from 'class-validator'
import { propertiesSwagger } from '@/core/utils'
import { Trim } from '@/core/decorators'

export class DirectionPropertiesSwagger {
	static name_(withValidation?: boolean) {
		const { minLength, maxLength } = directionValidation.name

		return propertiesSwagger({
			example: 'Кикбоксинг',
			decorators: withValidation
				? [
						IsString({ message: 'Направление должно быть строкой' }),
						Trim(),
						MaxLength(maxLength, {
							message: `Максимальная длина направления ${maxLength} символов`
						}),
						MinLength(minLength, {
							message: `Минимальная длина направления ${minLength} символа`
						})
					]
				: [],
			validation: withValidation ? directionValidation.name : {}
		})
	}
}
