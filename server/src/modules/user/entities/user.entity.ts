import { BaseEntity } from '@/core/database/entity'
import { UserAbonementEntity } from '@/modules/abonement/entities'
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
	birthday: string | null

	@Column({ nullable: true })
	howKnow: string | null

	@Column({
		unique: true,
		nullable: true
	})
	instagram: string | null

	@ManyToMany(() => GroupEntity, group => group.users)
	@JoinTable()
	groups: GroupEntity[]

	@ManyToOne(() => ClubEntity, club => club.users, { onDelete: 'SET NULL' })
	club: ClubEntity

	@OneToMany(() => OrderEntity, order => order.user, { cascade: true })
	orders: OrderEntity
	@OneToMany(() => UserAbonementEntity, abonements => abonements.user)
	abonements: UserAbonementEntity[]
}
