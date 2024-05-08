import { BaseEntity } from '@/core/database/entity'
import { GroupEntity } from '@/modules/group/entities'
import { ApiProperty } from '@nestjs/swagger'

import { Column, Entity, OneToMany } from 'typeorm'

@Entity('Direction')
export class DirectionEntity extends BaseEntity {
	@ApiProperty({
		example: 'Бокс',
		description: 'Название направления'
	})
	@Column({
		unique: true
	})
	public readonly name: string

	@ApiProperty({
		description: 'Группы',
		type: () => GroupEntity,
		isArray: true
	})
	@OneToMany(() => GroupEntity, group => group.direction, { cascade: true })
	public readonly groups: GroupEntity[]
}
