import { BaseEntity } from '@/core/database/entity'
import { Column, Entity } from 'typeorm'

@Entity('Abonement')
export class AbonementEntity extends BaseEntity {
	@Column()
	price: number

	@Column({
		unique: true
	})
	name: string

	@Column({
		nullable: true
	})
	count?: number

	@Column({
		nullable: true
	})
	duration: string
}
