import { BaseEntity } from '@/core/database'
import { Column, Entity } from 'typeorm'

import { EStaffRole } from '@/core/enums'

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
}
