import { Column, Entity, JoinColumn, OneToOne } from 'typeorm'
import { StaffEntity } from '@/modules/staff/entities'
import { BaseEntity } from '@/core/database/entity'

@Entity('Session')
export class SessionEntity extends BaseEntity {
	@Column({
		unique: true
	})
	token: string

	@OneToOne(() => StaffEntity)
	@JoinColumn()
	user: number
}
