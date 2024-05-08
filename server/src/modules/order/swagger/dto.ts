import { Type } from 'class-transformer'
import { ArrayMinSize, IsArray, Min, ValidateNested, IsInt } from 'class-validator'
import { ProductWithCount } from '../dto'
import { propertiesSwagger } from '@/core/utils'
import { orderValidation } from '../validation'

export class OrderDtoSwagger {
	static products() {
		const { minItems } = orderValidation.products

		return propertiesSwagger({
			isArray: true,
			example: [{ id: 2, count: 3 }],
			...orderValidation.products,
			decorators: [
				ValidateNested({ each: true }),
				ArrayMinSize(minItems, {
					message: `Массив товаров должен содержать не меньше ${minItems} элементов`
				}),
				IsArray(),
				Type(() => ProductWithCount)
			]
		})
	}

	static count() {
		const { min } = orderValidation.count

		return propertiesSwagger({
			example: 2,
			decorators: [Min(min, { message: `Минимальное количество товара ${min}` })]
		})
	}

	static user() {
		return propertiesSwagger({
			example: 6,
			decorators: [IsInt({ message: 'Id пользователя должен быть числом' })]
		})
	}
}
