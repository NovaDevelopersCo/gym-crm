import { BaseEntity } from '@/core/database/entity'
import { ClubEntity } from '@/modules/club/entities'
import { OrderItemEntity } from '@/modules/order/entities'
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm'
import { ProductPropertiesSwagger } from '../swagger/properties'

@Entity('Product')
export class ProductEntity extends BaseEntity {
	@ProductPropertiesSwagger.name_()
	@Column()
	public readonly name: string

	@ProductPropertiesSwagger.price()
	@Column()
	public readonly price: number

	@ProductPropertiesSwagger.club()
	@ManyToOne(() => ClubEntity, club => club.products, { onDelete: 'SET NULL' })
	public readonly club: ClubEntity

	@ProductPropertiesSwagger.orders()
	@OneToMany(() => OrderItemEntity, item => item.product)
	public readonly orders: OrderItemEntity[]
}
