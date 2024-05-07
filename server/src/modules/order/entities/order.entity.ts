import { BaseEntity } from '@/core/database/entity'
import { UserEntity } from '@/modules/user/entities'
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm'
import { OrderItemEntity } from './order-item.entity'
import { ApiProperty } from '@nestjs/swagger'

@Entity('Order')
export class OrderEntity extends BaseEntity {
	@ApiProperty({
		example: 1200,
		description: 'Итоговая сумма заказа'
	})
	@Column()
	total: number

	@ApiProperty({
		description: 'Составляющие заказа',
		type: () => OrderItemEntity,
		isArray: true
	})
	@OneToMany(() => OrderItemEntity, item => item.order, { cascade: true })
	items: OrderItemEntity[]

	@ApiProperty({
		description: 'Посетитель, совершивший заказ',
		type: () => UserEntity
	})
	@ManyToOne(() => UserEntity, user => user.orders, { onDelete: 'SET NULL' })
	user: UserEntity
}
