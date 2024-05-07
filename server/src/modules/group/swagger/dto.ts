import { groupValidation } from '../validation'
import { MaxLength, MinLength, IsString, IsInt } from 'class-validator'
import { propertiesSwagger } from '@/core/utils'
import { Trim } from '@/core/decorators'

export class GroupDtoSwagger {
	static name_() {
		const { minLength, maxLength } = groupValidation.name

		return propertiesSwagger({
			example: 'Группа 2',
			...groupValidation.name,
			decorators: [
				IsString({ message: 'Название группы должно быть строкой' }),
				Trim(),
				MaxLength(maxLength, {
					message: `Максимальная длина названия группы ${maxLength} символов`
				}),
				MinLength(minLength, {
					message: `Минимальная длина названия группы ${minLength} символа`
				})
			]
		})
	}

	static directionId() {
		return propertiesSwagger({
			example: 3,
			decorators: [IsInt({ message: 'Id направления должен быть числом' })]
		})
	}
}
