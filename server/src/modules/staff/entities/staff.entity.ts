import { BaseEntity } from '@/core/database'
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm'

import { EStaffRole } from '@/core/enums'
import { GroupEntity } from '@/modules/group/entities'
import { ClubEntity } from '@/modules/club/entities'

@Entity('Staff')
export class StaffEntity extends BaseEntity {
	@Column()
	fio: string

	@Column()
	password: string

	@Column({
		unique: true
	})
	email: string

	@Column({
		type: 'enum',
		enum: EStaffRole
	})
	role: EStaffRole

	@OneToMany(() => GroupEntity, group => group.trainer)
	groups: GroupEntity[]

	@OneToOne(() => ClubEntity, club => club.admin)
	@JoinColumn()
	club: ClubEntity
}
