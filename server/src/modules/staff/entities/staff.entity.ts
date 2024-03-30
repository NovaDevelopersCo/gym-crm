import { BaseEntity } from '@/core/database'
import { Column, Entity } from 'typeorm'

import { ECreateStaffRole } from '@/core/enums'

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
		enum: ECreateStaffRole
	})
	role: ECreateStaffRole
}
