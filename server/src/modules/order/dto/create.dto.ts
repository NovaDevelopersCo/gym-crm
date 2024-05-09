import { CommonPropertiesSwagger } from '@/core/swagger'
import { OrderPropertiesSwagger } from '../swagger'

export class ProductWithCount {
	@CommonPropertiesSwagger.id()
	public readonly id: number

	@OrderPropertiesSwagger.count()
	public readonly count: number
}

export class CreateOrderDto {
	@OrderPropertiesSwagger.user()
	public readonly user: number

	@OrderPropertiesSwagger.products()
	public readonly products: ProductWithCount[]
}
