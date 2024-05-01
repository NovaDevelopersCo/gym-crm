import { CommonDecoratorsSwagger, PaginationResponse } from '@/core/swagger'
import { OrderDecoratorsSwagger } from './decorators'
import { ApiProperty, IntersectionType, PickType } from '@nestjs/swagger'
import { ProductDto } from '@/modules/product/swagger'
import { UserDto } from '@/modules/user/swagger'

export class ProductId extends PickType(ProductDto, ['id']) {}

export class ProductWithId {
	@ApiProperty({ type: () => ProductId })
	product: ProductId
}

export class FullProduct {
	@ApiProperty({ type: () => ProductDto })
	product: ProductDto
}

export class OrderItemDto {
	@CommonDecoratorsSwagger.id()
	id: number

	@OrderDecoratorsSwagger.count()
	count: number

	@ApiProperty()
	price: number
}

export class OrderUserOnlyId extends PickType(UserDto, ['id']) {}
export class OrderUser extends PickType(UserDto, ['id', 'fio', 'email']) {}

export class OrderItemDtoWithProduct extends IntersectionType(OrderItemDto, FullProduct) {}
export class OrderItemDtoWithProductId extends IntersectionType(OrderItemDto, ProductWithId) {}

export class OrderDto {
	@CommonDecoratorsSwagger.id()
	id: number

	@ApiProperty({ example: 3424 })
	total: number
}

export class GetOrderByIdOk extends OrderDto {
	@ApiProperty({ isArray: true })
	items: OrderItemDtoWithProduct

	@ApiProperty()
	user: OrderUser
}

export class GetAllOrdersOk extends PaginationResponse {
	@ApiProperty({ isArray: true })
	items: GetOrderByIdOk
}

export class CreateOrderOk extends OrderDto {
	@ApiProperty({ isArray: true })
	items: OrderItemDtoWithProductId

	@ApiProperty({ example: { id: 2 } })
	user: OrderUserOnlyId
}
