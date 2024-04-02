import { BaseEntity } from '@/core/database'
import { EAbonementStatus } from '@/core/enums'
import { UserEntity } from '@/modules/user/entities'
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm'

@Entity('Abonement')
export class AbonementEntity extends BaseEntity {
	@OneToOne(() => UserEntity)
	@JoinColumn()
	user: UserEntity

	@Column({
		type: 'enum',
		enum: EAbonementStatus,
		default: EAbonementStatus.NOT_BUY
	})
	status: EAbonementStatus
}
