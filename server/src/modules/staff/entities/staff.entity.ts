import { BaseEntity } from '@/core/database/entity'
import { Column, Entity, ManyToOne } from 'typeorm'
import { EStaffRole } from '@/core/enums'
import { ClubEntity } from '@/modules/club/entities'
import { Exclude } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'

@Entity('Staff')
export class StaffEntity extends BaseEntity {
	@ApiProperty({
		example: '12345678',
		description: 'Пароль профиля персонала'
	})
	@Exclude()
	@Column()
	password: string

	@ApiProperty({
		example: 'email@gmail.com',
		description: 'Почтовый адрес профиля персонала'
	})
	@Column({
		unique: true
	})
	email: string

	@ApiProperty({
		example: 'admin',
		description: 'Роль персонала'
	})
	@Column({
		type: 'enum',
		enum: EStaffRole
	})
	role: EStaffRole

	@ApiProperty({
		description: 'Клуб',
		type: () => ClubEntity
	})
	@ManyToOne(() => ClubEntity, club => club.admins, { onDelete: 'SET NULL' })
	club: ClubEntity
}
