import { BaseEntity } from '@/core/database'
import { GroupEntity } from '@/modules/group/entities'
import { StaffEntity } from '@/modules/staff/entities'
import { UserEntity } from '@/modules/user/entities'
import { Column, Entity, OneToOne, OneToMany } from 'typeorm'

@Entity('Club')
export class ClubEntity extends BaseEntity {
	@Column({
		unique: true
	})
	address: string

	@Column({
		unique: true
	})
	name: string

	@OneToOne(() => StaffEntity, user => user.club, { cascade: true })
	admin: StaffEntity

	@OneToMany(() => GroupEntity, group => group.club)
	groups: GroupEntity[]

	@OneToMany(() => UserEntity, user => user.club)
	users: UserEntity[]
}
