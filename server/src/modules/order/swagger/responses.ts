import { IdDto, PaginationResponse } from '@/core/swagger'
import { ApiProperty } from '@nestjs/swagger'
import { UserDto } from '@/modules/user/swagger'
import { OrderItemDto, OrderDto } from './dto'
import { ProductDto } from '@/modules/product/swagger'

class OrderItem extends OrderItemDto {
	@ApiProperty({
		type: () => IdDto
	})
	public readonly product: IdDto
}

class OrderProductItem extends OrderItemDto {
	@ApiProperty({
		type: () => ProductDto
	})
	public readonly product: ProductDto
}

export class GetOrderByIdOk extends OrderDto {
	@ApiProperty({
		type: () => UserDto
	})
	public readonly user: UserDto

	@ApiProperty({
		type: () => OrderProductItem,
		isArray: true
	})
	public readonly items: OrderProductItem[]
}

export class GetAllOrdersOk extends PaginationResponse {
	@ApiProperty({ isArray: true })
	private readonly items: GetOrderByIdOk
}

export class CreateOrderOk extends OrderDto {
	@ApiProperty({
		type: () => IdDto
	})
	public readonly user: IdDto

	@ApiProperty({
		type: () => OrderItem,
		isArray: true
	})
	public readonly items: OrderItem[]
}
