import { BaseEntity } from '@/core/database'
import { Column, Entity } from 'typeorm'

import { EStaffRole } from '@/core/enums'

@Entity()
export class Staff extends BaseEntity {
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
