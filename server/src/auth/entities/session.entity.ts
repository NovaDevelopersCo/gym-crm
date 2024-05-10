import { Column, Entity, JoinColumn, OneToOne } from 'typeorm'
import { StaffEntity } from '@/modules/staff/entities'
import { BaseEntity } from '@/core/database/entity'
import { SessionPropertiesSwagger } from '../swagger/properties'

@Entity('Session')
export class SessionEntity extends BaseEntity {
	@SessionPropertiesSwagger.token()
	@Column({
		unique: true
	})
	public readonly token: string

	@SessionPropertiesSwagger.user()
	@OneToOne(() => StaffEntity, { onDelete: 'CASCADE' })
	@JoinColumn()
	public readonly user: number
}
