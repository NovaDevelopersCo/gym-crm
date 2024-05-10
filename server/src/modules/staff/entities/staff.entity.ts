import { BaseEntity } from '@/core/database/entity'
import { Column, Entity, ManyToOne } from 'typeorm'
import { EStaffRole } from '@/core/enums'
import { ClubEntity } from '@/modules/club/entities'
import { Exclude } from 'class-transformer'
import { CommonPropertiesSwagger } from '@/core/swagger'
import { StaffPropertiesSwagger } from '../swagger/properties'

@Entity('Staff')
export class StaffEntity extends BaseEntity {
	@CommonPropertiesSwagger.password()
	@Exclude()
	@Column()
	public password: string

	@CommonPropertiesSwagger.email()
	@Column({
		unique: true
	})
	public email: string

	@StaffPropertiesSwagger.role()
	@Column({
		type: 'enum',
		enum: EStaffRole
	})
	public role: EStaffRole

	@StaffPropertiesSwagger.club()
	@ManyToOne(() => ClubEntity, club => club.admins, { onDelete: 'SET NULL' })
	public club: ClubEntity
}
