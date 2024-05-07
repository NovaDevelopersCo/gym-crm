import { BaseEntity } from '@/core/database/entity'
import { ProductEntity } from '@/modules/product/entities'
import { Column, Entity, ManyToOne } from 'typeorm'
import { OrderEntity } from './order.entity'
import { ApiProperty } from '@nestjs/swagger'

@Entity('OrderItem')
export class OrderItemEntity extends BaseEntity {
	@ApiProperty({
		example: 5,
		description: 'Количество товара в заказе'
	})
	@Column()
	count: number

	@ApiProperty({
		example: 500,
		description: 'Стоимость товара'
	})
	@Column()
	price: number

	@ApiProperty({
		description: 'Товар',
		type: () => ProductEntity
	})
	@ManyToOne(() => ProductEntity, product => product.orders, { onDelete: 'SET NULL' })
	product: ProductEntity

	@ApiProperty({
		description: 'Заказ',
		type: () => OrderEntity
	})
	@ManyToOne(() => OrderEntity, order => order.items, { onDelete: 'CASCADE' })
	order: OrderEntity
}
