import { Type } from 'class-transformer'
import { ArrayMinSize, IsArray, Min, ValidateNested, IsInt } from 'class-validator'
import { propertiesSwagger } from '@/core/utils'
import { orderValidation } from '../validation'
import { ProductItem } from '../dto'

export class OrderPropertiesSwagger {
	public static products(item: new () => ProductItem) {
		const { minItems } = orderValidation.products

		return propertiesSwagger({
			isArray: true,
			example: [{ id: 2, count: 3 }],
			description: 'Список товаров',
			type: () => item,
			...orderValidation.products,
			decorators: [
				ValidateNested({ each: true }),
				ArrayMinSize(minItems, {
					message: `Массив товаров должен содержать не меньше ${minItems} элементов`
				}),
				IsArray(),
				Type(() => item)
			]
		})
	}

	public static user() {
		return propertiesSwagger({
			example: 6,
			description: 'Пользователь, сделавший заказ',
			decorators: [IsInt({ message: 'Id пользователя должен быть числом' })]
		})
	}

	public static count() {
		const { min } = orderValidation.count

		return propertiesSwagger({
			example: 2,
			description: 'Количество единиц определенного товара',
			decorators: [Min(min, { message: `Минимальное количество товара ${min}` })]
		})
	}
}
