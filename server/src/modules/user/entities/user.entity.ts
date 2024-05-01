import { BaseEntity } from '@/core/database/entity'
import { ClubEntity } from '@/modules/club/entities'
import { GroupEntity } from '@/modules/group/entities'
import { OrderEntity } from '@/modules/order/entities'
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm'

@Entity('Users')
export class UserEntity extends BaseEntity {
	@Column({
		unique: true
	})
	email: string

	@Column({
		unique: true
	})
	phone: string

	@Column()
	fio: string

	@Column({ type: 'date', nullable: true })
	birthday?: string

	@Column({ nullable: true })
	howKnow?: string

	@Column({
		unique: true,
		nullable: true
	})
	instagram: string

	@ManyToMany(() => GroupEntity, group => group.users)
	@JoinTable()
	groups: GroupEntity[]

	@ManyToOne(() => ClubEntity, club => club.users, { onDelete: 'SET NULL' })
	club: ClubEntity

	@OneToMany(() => OrderEntity, order => order.user, { cascade: true })
	orders: OrderEntity
}
