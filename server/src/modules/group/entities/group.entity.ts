import { BaseEntity } from '@/core/database/entity'
import { Column, Entity, ManyToMany, ManyToOne } from 'typeorm'
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

	@ManyToMany(() => UserEntity, user => user.groups)
	users: UserEntity[]
}
