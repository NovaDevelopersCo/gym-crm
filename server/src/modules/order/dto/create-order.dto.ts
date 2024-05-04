import { PropertyDecoratorsSwagger } from '@/core/swagger'
import { OrderDecoratorsSwagger } from '../swagger'

export class ProductWithCount {
	@PropertyDecoratorsSwagger.id(true)
	id: number

	@OrderDecoratorsSwagger.count(true)
	count: number
}

export class CreateOrderDto {
	@PropertyDecoratorsSwagger.userId(true)
	user: number

	@OrderDecoratorsSwagger.productCountObject(true)
	products: ProductWithCount[]
}

// FIX: add validation
