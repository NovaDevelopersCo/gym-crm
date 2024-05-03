import { groupValidation } from '../validation'
import { MaxLength, MinLength, IsString, IsInt } from 'class-validator'
import { propertiesSwagger } from '@/core/utils'

export class GroupPropertiesSwagger {
	static name_(withValidation?: boolean) {
		const { minLength, maxLength } = groupValidation.name

		return propertiesSwagger({
			example: 'Группа 2',
			validation: withValidation ? groupValidation.name : {},
			decorators: withValidation
				? [
						IsString({ message: 'Название группы должно быть строкой' }),
						MaxLength(maxLength, {
							message: `Максимальная длина названия группы ${maxLength} символов`
						}),
						MinLength(minLength, {
							message: `Минимальная длина названия группы ${minLength} символа`
						})
					]
				: []
		})
	}

	static directionId(withValidation?: boolean) {
		return propertiesSwagger({
			example: 3,
			decorators: withValidation
				? [IsInt({ message: 'Id направления должен быть числом ' })]
				: []
		})
	}
}
