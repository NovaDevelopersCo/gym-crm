import { Type } from 'class-transformer'
import { ArrayMinSize, IsArray, Min, ValidateNested, IsInt } from 'class-validator'
import { Property } from '@/core/utils'
import { orderValidation } from '../validation'
import { TProductItem } from '../dto'
import { UserEntity } from '@/modules/user/entities'
import { OrderEntity, OrderItemEntity } from '../entities'
import { ProductEntity } from '@/modules/product/entities'

export class OrderPropertiesSwagger {
	public static products(item: TProductItem) {
		const { minItems } = orderValidation.products

		return new Property({
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
			],
			validation: true
		}).exec()
	}

	public static userId() {
		return new Property({
			example: 6,
			description: 'Пользователь, сделавший заказ',
			decorators: [IsInt({ message: 'Id пользователя должен быть числом' })],
			validation: true
		}).exec()
	}

	public static count(validation?: boolean) {
		const { min } = orderValidation.count

		return new Property({
			example: 2,
			description: 'Количество единиц определенного товара',
			decorators: [Min(min, { message: `Минимальное количество товара ${min}` })],
			validation
		}).exec()
	}

	public static user() {
		return new Property({
			description: 'Посетитель, совершивший заказ',
			type: () => UserEntity
		}).exec()
	}

	public static items() {
		return new Property({
			description: 'Составляющие заказа',
			type: () => OrderItemEntity,
			isArray: true
		}).exec()
	}

	public static total() {
		return new Property({
			example: 1200,
			description: 'Итоговая сумма заказа'
		}).exec()
	}

	public static price() {
		return new Property({
			example: 500,
			description: 'Стоимость товара'
		}).exec()
	}

	public static product() {
		return new Property({
			description: 'Товар',
			type: () => ProductEntity
		}).exec()
	}

	public static order() {
		return new Property({
			description: 'Заказ',
			type: () => OrderEntity
		}).exec()
	}
}
