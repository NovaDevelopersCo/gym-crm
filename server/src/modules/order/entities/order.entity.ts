import { BaseEntity } from '@/core/database/entity'
import { UserEntity } from '@/modules/user/entities'
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm'
import { OrderItemEntity } from './order-item.entity'
import { OrderPropertiesSwagger } from '../swagger/properties'

@Entity('Order')
export class OrderEntity extends BaseEntity {
	@OrderPropertiesSwagger.total()
	@Column()
	public readonly total: number

	@OrderPropertiesSwagger.items()
	@OneToMany(() => OrderItemEntity, item => item.order, { cascade: true })
	public readonly items: OrderItemEntity[]

	@OrderPropertiesSwagger.user()
	@ManyToOne(() => UserEntity, user => user.orders, { onDelete: 'SET NULL' })
	public readonly user: UserEntity
}
