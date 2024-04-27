import { BaseEntity } from '@/core/database/entity'
import { GroupEntity } from '@/modules/group/entities'
import { StaffEntity } from '@/modules/staff/entities'
import { UserEntity } from '@/modules/user/entities'
import { Column, Entity, OneToMany } from 'typeorm'

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

	@OneToMany(() => StaffEntity, admin => admin.club, { cascade: true })
	admins: StaffEntity[]

	@OneToMany(() => GroupEntity, group => group.club, { cascade: true })
	groups: GroupEntity[]

	@OneToMany(() => UserEntity, user => user.club, { cascade: true })
	users: UserEntity[]
}
