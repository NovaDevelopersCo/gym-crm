import { BaseEntity } from '@/core/database/entity'
import { Column, Entity, ManyToOne } from 'typeorm'
import { AbonementEntity } from './abonement.entity'
import { UserEntity } from '@/modules/user/entities'

@Entity('UserAbonement')
export class UserAbonementEntity extends BaseEntity {
	@Column()
	price: number

	@Column({
		nullable: true
	})
	start?: string

	@Column({
		nullable: true
	})
	end?: string

	@Column({
		default: false
	})
	isFinish: boolean

	@ManyToOne(() => AbonementEntity, abonement => abonement.userAbonements)
	abonement: AbonementEntity

	@ManyToOne(() => UserEntity, user => user.abonements)
	user: UserEntity

	@Column({
		nullable: true
	})
	count?: number
}
