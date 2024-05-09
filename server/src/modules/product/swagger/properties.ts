import { productValidation } from '../validation'
import { MaxLength, MinLength, IsString, Min, Max } from 'class-validator'
import { Trim } from '@/core/decorators'
import { propertiesSwagger } from '@/core/utils'

export class ProductPropertiesSwagger {
	public static name_() {
		const { minLength, maxLength } = productValidation.name

		return propertiesSwagger({
			example: 'Шлем',
			...productValidation.name,
			decorators: [
				IsString({ message: 'Название продукта должно быть строкой' }),
				Trim(),
				MaxLength(maxLength, {
					message: `Максимальная длина названия продукта ${maxLength} символов`
				}),
				MinLength(minLength, {
					message: `Минимальная длина названия продукта ${minLength} символа`
				})
			]
		})
	}

	public static price() {
		const { min, max } = productValidation.price

		return propertiesSwagger({
			example: 35,
			...productValidation.price,
			decorators: [
				Min(min, { message: `Минимальная цена продукта ${min}` }),
				Max(max, { message: `Максимальная цена продукта ${max}` })
			]
		})
	}
}
