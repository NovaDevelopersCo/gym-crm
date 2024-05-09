import { CommonPropertiesSwagger } from '@/core/swagger'
import { OrderPropertiesSwagger } from '../swagger'

export class ProductItem {
	@CommonPropertiesSwagger.id()
	public readonly id: number

	@OrderPropertiesSwagger.count()
	public readonly count: number
}

export class CreateOrderDto {
	@OrderPropertiesSwagger.user()
	public readonly user: number

	@OrderPropertiesSwagger.products(ProductItem)
	public readonly products: ProductItem[]
}
