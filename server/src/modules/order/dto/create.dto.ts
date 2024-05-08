import { CommonDtoSwagger } from '@/core/swagger'
import { OrderDtoSwagger } from '../swagger'

export class ProductWithCount {
	@CommonDtoSwagger.id()
	public readonly id: number

	@OrderDtoSwagger.count()
	public readonly count: number
}

export class CreateOrderDto {
	@OrderDtoSwagger.user()
	public readonly user: number

	@OrderDtoSwagger.products()
	public readonly products: ProductWithCount[]
}
