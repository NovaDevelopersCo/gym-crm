import { BaseEntity } from '@/core/database'
import { Column, Entity, OneToMany } from 'typeorm'

import { EStaffRole } from '@/core/enums'
import { GroupEntity } from '@/modules/group/entities'

@Entity('Staff')
export class StaffEntity extends BaseEntity {
	@Column()
	name: string

	@Column()
	password: string

	@Column()
	email: string

	@Column({
		type: 'enum',
		enum: EStaffRole
	})
	role: EStaffRole

	//! from the trainer
	// ! beta
	@OneToMany(() => GroupEntity, group => group.trainer)
	groups: GroupEntity[]
}
