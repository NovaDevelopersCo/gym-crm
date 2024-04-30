import { BaseEntity } from '@/core/database/entity'
import { ClubEntity } from '@/modules/club/entities'
import { Column, Entity, ManyToOne } from 'typeorm'

@Entity('Product')
export class ProductEntity extends BaseEntity {
	@Column()
	name: string

	@Column()
	price: number

	@ManyToOne(() => ClubEntity, club => club.products)
	club: ClubEntity

	// orders:
}
