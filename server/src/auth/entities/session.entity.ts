import { Column, Entity, JoinColumn, OneToOne } from 'typeorm'
import { StaffEntity } from '@/modules/staff/entities'
import { BaseEntity } from '@core/database'

@Entity('Session')
export class SessionEntity extends BaseEntity {
	@Column()
	token: string

	@OneToOne(() => StaffEntity)
	@JoinColumn()
	user: number
}
