import { BaseEntity } from '@/core/database/entity'
import { AbonementEntity } from '@/modules/abonement/entities'
import { GroupEntity } from '@/modules/group/entities'
import { ProductEntity } from '@/modules/product/entities'
import { StaffEntity } from '@/modules/staff/entities'
import { UserEntity } from '@/modules/user/entities'
import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, OneToMany, ManyToMany } from 'typeorm'

@Entity('Club')
export class ClubEntity extends BaseEntity {
	@ApiProperty({
		example: 'г. Москва, ул. Колотушкина',
		description: 'Адрес клуба'
	})
	@Column({
		unique: true
	})
	address: string

	@ApiProperty({
		example: 'Mass Club',
		description: 'Название клуба'
	})
	@Column({
		unique: true
	})
	name: string

	@ApiProperty({
		description: 'Администраторы',
		type: () => StaffEntity,
		isArray: true
	})
	@OneToMany(() => StaffEntity, admin => admin.club, { cascade: true })
	admins: StaffEntity[]

	@ApiProperty({
		description: 'Группы',
		type: () => GroupEntity,
		isArray: true
	})
	@OneToMany(() => GroupEntity, group => group.club, { cascade: true })
	groups: GroupEntity[]

	@ApiProperty({
		description: 'Посетители',
		type: () => UserEntity,
		isArray: true
	})
	@OneToMany(() => UserEntity, user => user.club, { cascade: true })
	users: UserEntity[]

	@ApiProperty({
		description: 'Товары',
		type: () => ProductEntity,
		isArray: true
	})
	@OneToMany(() => ProductEntity, product => product.club, { cascade: true })
	products: ProductEntity[]

	@ApiProperty({
		description: 'Абонементы',
		type: () => AbonementEntity,
		isArray: true
	})
	@ManyToMany(() => AbonementEntity)
	abonements: AbonementEntity[]
}
