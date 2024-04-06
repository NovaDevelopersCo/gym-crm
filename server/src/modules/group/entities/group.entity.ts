import { BaseEntity } from '@core/database'
import { Column, Entity, ManyToMany, ManyToOne } from 'typeorm'
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

	@ManyToOne(() => DirectionEntity, direction => direction.groups)
	direction: DirectionEntity

	@ManyToOne(() => ClubEntity, club => club.groups)
	club: ClubEntity

	@ManyToOne(() => StaffEntity, trainer => trainer.groups)
	trainer: StaffEntity

	@ManyToMany(() => UserEntity, user => user.groups)
	users: UserEntity[]
}
