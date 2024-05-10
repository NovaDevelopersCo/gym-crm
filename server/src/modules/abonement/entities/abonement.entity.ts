import { BaseEntity } from '@/core/database/entity'
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm'
import { UserAbonementEntity } from './user-abonement.entity'
import { ClubEntity } from '@/modules/club/entities'
import { AbonementPropertiesSwagger } from '../swagger/properties'

@Entity('Abonement')
export class AbonementEntity extends BaseEntity {
	@AbonementPropertiesSwagger.price()
	@Column()
	public readonly price: number

	@AbonementPropertiesSwagger.name_()
	@Column({
		unique: true
	})
	public readonly name: string

	@AbonementPropertiesSwagger.count()
	@Column({
		nullable: true
	})
	public readonly count: number | null

	@AbonementPropertiesSwagger.duration()
	@Column({
		nullable: true
	})
	public readonly duration: string | null

	@AbonementPropertiesSwagger.userAbonements()
	@OneToMany(() => UserAbonementEntity, userAbonement => userAbonement.abonement)
	public readonly userAbonements: UserAbonementEntity[]

	@AbonementPropertiesSwagger.clubs()
	@ManyToMany(() => ClubEntity)
	@JoinTable()
	public readonly clubs: ClubEntity[]
}
