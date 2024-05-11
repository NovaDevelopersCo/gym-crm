import { CommonPropertiesSwagger } from '@/core/swagger'
import { OrderPropertiesSwagger } from '../swagger'

export type TProductItem = new () => ProductItem

class ProductItem {
	@CommonPropertiesSwagger.id()
	public readonly id: number

	@OrderPropertiesSwagger.count(true)
	public readonly count: number
}

export class CreateOrderDto {
	@OrderPropertiesSwagger.userId()
	public readonly user: number

	@OrderPropertiesSwagger.products(ProductItem)
	public readonly products: ProductItem[]
}
