import { BaseEntity } from '@/core/database/entity'
import { Column, Entity, OneToMany } from 'typeorm'
import { UserAbonementEntity } from './user-abonement.entity'

@Entity('Abonement')
export class AbonementEntity extends BaseEntity {
	@Column()
	price: number

	@Column({
		unique: true
	})
	name: string

	@Column({
		nullable: true
	})
	count?: number

	@Column({
		nullable: true
	})
	duration?: string

	@OneToMany(() => UserAbonementEntity, userAbonement => userAbonement.abonement)
	userAbonements: UserAbonementEntity[]
}
