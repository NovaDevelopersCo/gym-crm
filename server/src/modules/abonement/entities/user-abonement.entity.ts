import { BaseEntity } from '@/core/database/entity'
import { Column, Entity, ManyToOne } from 'typeorm'
import { AbonementEntity } from './abonement.entity'
import { UserEntity } from '@/modules/user/entities'
import { ApiProperty } from '@nestjs/swagger'

@Entity('UserAbonement')
export class UserAbonementEntity extends BaseEntity {
	@ApiProperty({
		example: 1200,
		description: 'Цена абонемента'
	})
	@Column()
	price: number

	@ApiProperty({
		example: '2024-05-01',
		description: 'Дата начала действия абонемента',
		nullable: true
	})
	@Column({
		nullable: true
	})
	start: string | null

	@ApiProperty({
		example: '2024-09-01',
		description: 'Дата окончания действия абонемента',
		nullable: true
	})
	@Column({
		nullable: true
	})
	end: string | null

	@ApiProperty({
		example: false,
		description: 'Статус окончания абонемента'
	})
	@Column({
		default: false
	})
	isFinish: boolean

	@ApiProperty({
		description: 'Абонемент',
		type: () => AbonementEntity
	})
	@ManyToOne(() => AbonementEntity, abonement => abonement.userAbonements)
	abonement: AbonementEntity

	@ApiProperty({
		description: 'Пользователь',
		type: () => UserEntity
	})
	@ManyToOne(() => UserEntity, user => user.abonements)
	user: UserEntity

	@ApiProperty({
		description: 'Количество оставшихся занятий',
		example: 12,
		nullable: true
	})
	@Column({
		nullable: true
	})
	count: number | null
}
