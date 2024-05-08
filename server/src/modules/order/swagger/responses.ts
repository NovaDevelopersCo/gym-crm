import { CommonDtoSwagger, PaginationResponse } from '@/core/swagger'
import { OrderDtoSwagger } from './dto'
import { ApiProperty, IntersectionType, PickType } from '@nestjs/swagger'
import { ProductDto } from '@/modules/product/swagger'
import { UserDto } from '@/modules/user/swagger'

export class ProductWithId {
	@ApiProperty({ type: () => PickType(ProductDto, ['id']) })
	private readonly product: number
}

export class FullProduct {
	@ApiProperty({ type: () => ProductDto })
	private readonly product: ProductDto
}

export class OrderItemDto {
	@CommonDtoSwagger.id()
	private readonly id: number

	@OrderDtoSwagger.count()
	private readonly count: number

	@ApiProperty()
	private readonly price: number
}

export class OrderUserOnlyId extends PickType(UserDto, ['id']) {}
export class OrderUser extends PickType(UserDto, ['id', 'fio', 'email']) {}

export class OrderItemDtoWithProduct extends IntersectionType(OrderItemDto, FullProduct) {}
export class OrderItemDtoWithProductId extends IntersectionType(OrderItemDto, ProductWithId) {}

export class OrderDto {
	@CommonDtoSwagger.id()
	private readonly id: number

	@ApiProperty({ example: 3424 })
	private readonly total: number
}

export class GetOrderByIdOk extends OrderDto {
	@ApiProperty({ isArray: true })
	private readonly items: OrderItemDtoWithProduct

	@ApiProperty()
	private readonly user: OrderUser
}

export class GetAllOrdersOk extends PaginationResponse {
	@ApiProperty({ isArray: true })
	private readonly items: GetOrderByIdOk
}

export class CreateOrderOk extends OrderDto {
	@ApiProperty({ isArray: true })
	private readonly items: OrderItemDtoWithProductId

	@ApiProperty({ example: { id: 2 } })
	private readonly user: OrderUserOnlyId
}
