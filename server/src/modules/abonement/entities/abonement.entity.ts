import { BaseEntity } from '@/core/database/entity'
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm'
import { UserAbonementEntity } from './user-abonement.entity'
import { ClubEntity } from '@/modules/club/entities'
import { ApiProperty } from '@nestjs/swagger'

@Entity('Abonement')
export class AbonementEntity extends BaseEntity {
	@ApiProperty({
		description: 'Цена абонемента',
		example: 1200
	})
	@Column()
	price: number

	@ApiProperty({
		description: 'Название абонемента',
		example: 'Групповой'
	})
	@Column({
		unique: true
	})
	name: string

	@ApiProperty({
		description: 'Количество занятий в абонементе',
		example: 8,
		nullable: true
	})
	@Column({
		nullable: true
	})
	count: number | null

	@ApiProperty({
		description: 'Длительность абонемента',
		example: '10d.',
		nullable: true
	})
	@Column({
		nullable: true
	})
	duration: string | null

	@ApiProperty({
		description: 'Абонементы посетителей',
		type: () => UserAbonementEntity,
		isArray: true
	})
	@OneToMany(() => UserAbonementEntity, userAbonement => userAbonement.abonement)
	userAbonements: UserAbonementEntity[]

	@ApiProperty({
		description: 'Клубы в которых действует абонемент',
		type: () => ClubEntity,
		isArray: true
	})
	@ManyToMany(() => ClubEntity)
	@JoinTable()
	clubs: ClubEntity[]
}
