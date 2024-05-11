import { OmitType } from '@nestjs/swagger'
import { OrderEntity, OrderItemEntity } from '../entities'

export class OrderItemDto extends OmitType(OrderItemEntity, ['product', 'order']) {}
export class OrderDto extends OmitType(OrderEntity, ['items', 'user']) {}
