import { CommonDecoratorsSwagger } from '@/core/swagger'
import { OrderDecoratorsSwagger } from '../swagger'

export class ProductWithCount {
	@CommonDecoratorsSwagger.id(true)
	id: number

	@OrderDecoratorsSwagger.count(true)
	count: number
}

export class CreateOrderDto {
	@CommonDecoratorsSwagger.userId(true)
	user: number

	@OrderDecoratorsSwagger.productCountObject(true)
	products: ProductWithCount[]
}

// FIX: add validation
