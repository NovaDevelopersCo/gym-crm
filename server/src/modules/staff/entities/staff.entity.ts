import { BaseEntity } from '@/core/database/entity'
import { Column, Entity, ManyToOne } from 'typeorm'
import { EStaffRole } from '@/core/enums'
import { ClubEntity } from '@/modules/club/entities'
import { Exclude } from 'class-transformer'

@Entity('Staff')
export class StaffEntity extends BaseEntity {
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

	@ManyToOne(() => ClubEntity, club => club.admins, { onDelete: 'SET NULL' })
	club: ClubEntity
}
