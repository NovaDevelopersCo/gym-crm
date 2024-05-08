import { BaseEntity } from '@/core/database/entity'
import { ClubEntity } from '@/modules/club/entities'
import { OrderItemEntity } from '@/modules/order/entities'
import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm'

@Entity('Product')
export class ProductEntity extends BaseEntity {
	@ApiProperty({
		example: 'Кроссовки Nike Air Jordan 1, 1шт.',
		description: 'Название продукта'
	})
	@Column()
	public readonly name: string

	@ApiProperty({
		example: 400,
		description: 'Стоимость товара 1шт.'
	})
	@Column()
	public readonly price: number

	@ApiProperty({
		description: 'Клуб',
		type: () => ClubEntity
	})
	@ManyToOne(() => ClubEntity, club => club.products, { onDelete: 'SET NULL' })
	public readonly club: ClubEntity

	@ApiProperty({
		description: 'Заказы',
		type: () => OrderItemEntity,
		isArray: true
	})
	@OneToMany(() => OrderItemEntity, item => item.product)
	public readonly orders: OrderItemEntity[]
}
