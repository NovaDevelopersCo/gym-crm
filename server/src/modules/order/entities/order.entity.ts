import { BaseEntity } from '@/core/database/entity'
import { UserEntity } from '@/modules/user/entities'
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm'
import { OrderItemEntity } from './order-item.entity'

@Entity('Order')
export class OrderEntity extends BaseEntity {
	@Column()
	total: number

	@OneToMany(() => OrderItemEntity, item => item.order, { cascade: true })
	items: OrderItemEntity[]

	@ManyToOne(() => UserEntity, user => user.orders, { onDelete: 'SET NULL' })
	user: UserEntity
}
