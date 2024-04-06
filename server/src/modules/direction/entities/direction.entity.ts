import { BaseEntity } from '@/core/database/entity'
import { GroupEntity } from '@/modules/group/entities'

import { Column, Entity, OneToMany } from 'typeorm'

@Entity('Direction')
export class DirectionEntity extends BaseEntity {
	@Column({
		unique: true
	})
	name: string

	@OneToMany(() => GroupEntity, group => group.direction)
	groups: GroupEntity[]
}
