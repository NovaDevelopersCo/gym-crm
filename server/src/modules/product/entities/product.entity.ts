import { BaseEntity } from '@/core/database/entity'
import { ClubEntity } from '@/modules/club/entities'
import { OrderItemEntity } from '@/modules/order/entities'
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm'

@Entity('Product')
export class ProductEntity extends BaseEntity {
	@Column()
	name: string

	@Column()
	price: number

	@ManyToOne(() => ClubEntity, club => club.products, { onDelete: 'SET NULL' })
	club: ClubEntity

	@OneToMany(() => OrderItemEntity, item => item.product)
	orders: OrderItemEntity[]
}
