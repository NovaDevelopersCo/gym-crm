import { BaseEntity } from '@/core/database/entity'
import { UserAbonementEntity } from '@/modules/abonement/entities'
import { ClubEntity } from '@/modules/club/entities'
import { GroupEntity } from '@/modules/group/entities'
import { OrderEntity } from '@/modules/order/entities'
import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm'

@Entity('Users')
export class UserEntity extends BaseEntity {
	@ApiProperty({
		example: 'email@gmail.com',
		description: 'Почтовый адрес посетителя'
	})
	@Column({
		unique: true
	})
	email: string

	@ApiProperty({
		example: '7999999999',
		description: 'Телефон посетителя'
	})
	@Column({
		unique: true
	})
	phone: string

	@ApiProperty({
		example: 'Васина Екатерина Петровна',
		description: 'Ф.И.О. посетителя'
	})
	@Column()
	fio: string

	@ApiProperty({
		example: '2024-07-11',
		description: 'Дата рождения посетителя'
	})
	@Column({ type: 'date', nullable: true })
	birthday: string | null

	@ApiProperty({
		example: 'Посоветовали друзья',
		description: 'Как вы узнали о нас?'
	})
	@Column({ nullable: true })
	howKnow: string | null

	@ApiProperty({
		example: 'my_account',
		description: 'Инстаграм пользователя'
	})
	@Column({
		unique: true,
		nullable: true
	})
	instagram: string | null

	@ApiProperty({
		description: 'Группы',
		type: () => GroupEntity,
		isArray: true
	})
	@ManyToMany(() => GroupEntity, group => group.users)
	@JoinTable()
	groups: GroupEntity[]

	@ApiProperty({
		description: 'Клуб',
		type: () => ClubEntity
	})
	@ManyToOne(() => ClubEntity, club => club.users, { onDelete: 'SET NULL' })
	club: ClubEntity

	@ApiProperty({
		description: 'Заказы',
		type: () => OrderEntity
	})
	@OneToMany(() => OrderEntity, order => order.user, { cascade: true })
	orders: OrderEntity

	@ApiProperty({
		description: 'Абонементы',
		type: () => UserAbonementEntity,
		isArray: true
	})
	@OneToMany(() => UserAbonementEntity, abonements => abonements.user)
	abonements: UserAbonementEntity[]
}
