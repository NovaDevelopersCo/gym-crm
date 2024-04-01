import { BaseEntity } from '@/core/database'
import { Column, ManyToOne } from 'typeorm'

import { StaffEntity } from '@/modules/staff/entities'
import { DirectionEntity } from '@/modules/direction/entities'
import { ClubEntity } from '@/modules/club/entities'

export class GroupEntity extends BaseEntity {
	@Column()
	name: string

	// ! add cascade
	@ManyToOne(() => DirectionEntity, direction => direction.groups)
	direction: DirectionEntity

	// ! Add cascade
	@ManyToOne(() => ClubEntity, club => club.groups)
	club: ClubEntity

	// @OneToMany(() => StaffEntity, staff => staff.id)
	// trainer: number

	//! trainer
	//! Beta
	@ManyToOne(() => StaffEntity, trainer => trainer.groups)
	trainer: StaffEntity
}
