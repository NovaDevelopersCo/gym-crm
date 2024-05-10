import { BaseEntity } from '@/core/database/entity'
import { GroupEntity } from '@/modules/group/entities'

import { Column, Entity, OneToMany } from 'typeorm'
import { DirectionPropertiesSwagger } from '../swagger/properties'

@Entity('Direction')
export class DirectionEntity extends BaseEntity {
	@DirectionPropertiesSwagger.name_()
	@Column({
		unique: true
	})
	public readonly name: string

	@DirectionPropertiesSwagger.groups()
	@OneToMany(() => GroupEntity, group => group.direction, { cascade: true })
	public readonly groups: GroupEntity[]
}
