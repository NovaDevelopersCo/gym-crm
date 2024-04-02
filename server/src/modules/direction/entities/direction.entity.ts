import { BaseEntity } from '@/core/database'
import { GroupEntity } from '@/modules/group/entities'

import { Column, Entity, OneToMany } from 'typeorm'

@Entity('Direction')
export class DirectionEntity extends BaseEntity {
	@Column()
	name: string

	@Column()
	image: string

	@OneToMany(() => GroupEntity, group => group.direction)
	groups: GroupEntity[]
}
