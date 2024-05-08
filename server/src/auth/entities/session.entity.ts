import { Column, Entity, JoinColumn, OneToOne } from 'typeorm'
import { StaffEntity } from '@/modules/staff/entities'
import { BaseEntity } from '@/core/database/entity'
import { ApiProperty } from '@nestjs/swagger'

@Entity('Session')
export class SessionEntity extends BaseEntity {
	@ApiProperty({
		description: 'Refresh токен',
		example:
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
	})
	@Column({
		unique: true
	})
	public readonly token: string

	@ApiProperty({
		description: 'Пользователь',
		type: () => StaffEntity
	})
	@OneToOne(() => StaffEntity, { onDelete: 'CASCADE' })
	@JoinColumn()
	public readonly user: number
}
