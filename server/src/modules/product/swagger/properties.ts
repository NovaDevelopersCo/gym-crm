import { productValidation } from '../validation'
import { MaxLength, MinLength, IsString, Min, Max } from 'class-validator'
import { Trim } from '@/core/decorators'
import { Property } from '@/core/utils'
import { OrderItemEntity } from '@/modules/order/entities'
import { ClubEntity } from '@/modules/club/entities'

export class ProductPropertiesSwagger {
	public static name_(validation?: boolean) {
		const { minLength, maxLength } = productValidation.name

		return new Property({
			example: 'Шлем',
			...productValidation.name,
			description: 'Название продукта',
			decorators: [
				IsString({ message: 'Название продукта должно быть строкой' }),
				Trim(),
				MaxLength(maxLength, {
					message: `Максимальная длина названия продукта ${maxLength} символов`
				}),
				MinLength(minLength, {
					message: `Минимальная длина названия продукта ${minLength} символа`
				})
			],
			validation
		}).exec()
	}

	public static price(validation?: boolean) {
		const { min, max } = productValidation.price

		return new Property({
			example: 35,
			description: 'Стоимость товара 1шт.',
			...productValidation.price,
			decorators: [
				Min(min, { message: `Минимальная цена продукта ${min}` }),
				Max(max, { message: `Максимальная цена продукта ${max}` })
			],
			validation
		}).exec()
	}

	public static club() {
		return new Property({
			description: 'Клуб',
			type: () => ClubEntity
		}).exec()
	}

	public static orders() {
		return new Property({
			description: 'Заказы',
			type: () => OrderItemEntity,
			isArray: true
		}).exec()
	}
}
