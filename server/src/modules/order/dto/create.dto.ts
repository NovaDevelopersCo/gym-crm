import { CommonDtoSwagger } from '@/core/swagger'
import { OrderDtoSwagger } from '../swagger'

export class ProductWithCount {
	@CommonDtoSwagger.id()
	id: number

	@OrderDtoSwagger.count()
	count: number
}

export class CreateOrderDto {
	@CommonDtoSwagger.userId()
	user: number

	@OrderDtoSwagger.products()
	products: ProductWithCount[]
}
