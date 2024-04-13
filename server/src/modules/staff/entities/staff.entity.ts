import { BaseEntity } from '@/core/database/entity'
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm'
import { EStaffRole } from '@/core/enums'
import { ClubEntity } from '@/modules/club/entities'
import { Exclude } from 'class-transformer'

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

	@OneToOne(() => ClubEntity, club => club.admin, { onDelete: 'SET NULL' })
	@JoinColumn()
	club: ClubEntity
}
