import { BaseEntity } from '@/core/database'

import { Column, Entity } from 'typeorm'

@Entity('Direction')
export class DirectionEntity extends BaseEntity {
	@Column()
	name: string

	@Column()
	image: string
}
