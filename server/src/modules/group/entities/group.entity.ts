import { BaseEntity } from '@/core/database'
import { Column, OneToMany } from 'typeorm'

import { StaffEntity } from '@/modules/staff/entities'
import { DirectionEntity } from '@/modules/direction/entities'

export class GroupEntity extends BaseEntity {
	@Column()
	name: string

	@OneToMany(() => StaffEntity, staff => staff.id)
	trainer: number

	@OneToMany(() => DirectionEntity, direction => direction.id)
	direction: number
}
