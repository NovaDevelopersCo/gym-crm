import { Column, Entity, JoinColumn, OneToOne } from 'typeorm'
import { StaffEntity } from './index'
import { BaseEntity } from '@core/database'

@Entity()
export class Session extends BaseEntity {
	@Column()
	token: string

	@OneToOne(() => StaffEntity)
	@JoinColumn()
	user: number
}
