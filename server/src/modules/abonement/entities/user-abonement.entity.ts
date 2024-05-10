import { BaseEntity } from '@/core/database/entity'
import { Column, Entity, ManyToOne } from 'typeorm'
import { AbonementEntity } from './abonement.entity'
import { UserEntity } from '@/modules/user/entities'
import { AbonementPropertiesSwagger } from '../swagger/properties'

@Entity('UserAbonement')
export class UserAbonementEntity extends BaseEntity {
	@AbonementPropertiesSwagger.price()
	@Column()
	public readonly price: number

	@AbonementPropertiesSwagger.start()
	@Column({
		nullable: true
	})
	public readonly start: string | null

	@AbonementPropertiesSwagger.end()
	@Column({
		nullable: true
	})
	public readonly end: string | null

	@AbonementPropertiesSwagger.isFinish()
	@Column({
		default: false
	})
	public readonly isFinish: boolean

	@AbonementPropertiesSwagger.abonement()
	@ManyToOne(() => AbonementEntity, abonement => abonement.userAbonements)
	public readonly abonement: AbonementEntity

	@AbonementPropertiesSwagger.user()
	@ManyToOne(() => UserEntity, user => user.abonements)
	public readonly user: UserEntity

	@AbonementPropertiesSwagger.count()
	@Column({
		nullable: true
	})
	public readonly count: number | null
}
