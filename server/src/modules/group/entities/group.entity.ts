import { BaseEntity } from '@/core/database'
import { Column, Entity, ManyToOne } from 'typeorm'

import { StaffEntity } from '@/modules/staff/entities'
import { DirectionEntity } from '@/modules/direction/entities'
import { ClubEntity } from '@/modules/club/entities'
import { UserEntity } from '@/modules/user/entities'

@Entity('Group')
export class GroupEntity extends BaseEntity {
	@Column({
		unique: true
	})
	name: string

	@ManyToOne(() => DirectionEntity, direction => direction.id)
	direction: DirectionEntity

	@ManyToOne(() => ClubEntity, club => club.id)
	club: ClubEntity

	@ManyToOne(() => StaffEntity, trainer => trainer.id)
	trainer: StaffEntity

	@ManyToOne(() => UserEntity, user => user.id)
	users: UserEntity
}
