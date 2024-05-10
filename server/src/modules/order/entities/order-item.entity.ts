import { BaseEntity } from '@/core/database/entity'
import { ProductEntity } from '@/modules/product/entities'
import { Column, Entity, ManyToOne } from 'typeorm'
import { OrderEntity } from './order.entity'
import { OrderPropertiesSwagger } from '../swagger/properties'

@Entity('OrderItem')
export class OrderItemEntity extends BaseEntity {
	@OrderPropertiesSwagger.count()
	@Column()
	public readonly count: number

	@OrderPropertiesSwagger.price()
	@Column()
	public readonly price: number

	@OrderPropertiesSwagger.product()
	@ManyToOne(() => ProductEntity, product => product.orders, { onDelete: 'SET NULL' })
	public readonly product: ProductEntity

	@OrderPropertiesSwagger.order()
	@ManyToOne(() => OrderEntity, order => order.items, { onDelete: 'CASCADE' })
	public readonly order: OrderEntity
}
