import { BaseEntity } from '@/core/database/entity'
import { Column, Entity, ManyToMany, OneToMany, OneToOne } from 'typeorm'

import { EStaffRole } from '@/core/enums'
import { GroupEntity } from '@/modules/group/entities'
import { ClubEntity } from '@/modules/club/entities'
import { Exclude } from 'class-transformer'
import { UserEntity } from '@/modules/user/entities'

@Entity('Staff')
export class StaffEntity extends BaseEntity {
	@Column()
	fio: string

	@Exclude()
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

	@OneToOne(() => ClubEntity, club => club.admin, { onDelete: 'SET NULL' })
	club: ClubEntity

	@ManyToMany(() => UserEntity, user => user.trainers)
	users: UserEntity[]
}
