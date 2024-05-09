import { PickType } from '@nestjs/swagger'
import { OrderEntity, OrderItemEntity } from '../entities'

export class OrderItemDto extends PickType(OrderItemEntity, ['id', 'count', 'price']) {}
export class OrderDto extends PickType(OrderEntity, ['id', 'total']) {}
