import { BaseEntity } from '@/core/database/entity'
import { CommonPropertiesSwagger } from '@/core/swagger'
import { UserAbonementEntity } from '@/modules/abonement/entities'
import { ClubEntity } from '@/modules/club/entities'
import { GroupEntity } from '@/modules/group/entities'
import { OrderEntity } from '@/modules/order/entities'
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm'
import { UserPropertiesSwagger } from '../swagger/properties'

@Entity('Users')
export class UserEntity extends BaseEntity {
	@CommonPropertiesSwagger.email()
	@Column({
		unique: true
	})
	public email: string

	@UserPropertiesSwagger.phone()
	@Column({
		unique: true
	})
	public phone: string

	@UserPropertiesSwagger.fio()
	@Column()
	public fio: string

	@UserPropertiesSwagger.birthday()
	@Column({ type: 'date', nullable: true })
	public birthday: string | null

	@UserPropertiesSwagger.howKnow()
	@Column({ nullable: true })
	public howKnow: string | null

	@UserPropertiesSwagger.instagram()
	@Column({
		unique: true,
		nullable: true
	})
	public instagram: string | null

	@UserPropertiesSwagger.groups()
	@ManyToMany(() => GroupEntity, group => group.users)
	@JoinTable()
	public groups: GroupEntity[]

	@UserPropertiesSwagger.club()
	@ManyToOne(() => ClubEntity, club => club.users, { onDelete: 'SET NULL' })
	public club: ClubEntity

	@UserPropertiesSwagger.orders()
	@OneToMany(() => OrderEntity, order => order.user, { cascade: true })
	public orders: OrderEntity

	@UserPropertiesSwagger.abonements()
	@OneToMany(() => UserAbonementEntity, abonements => abonements.user)
	public abonements: UserAbonementEntity[]
}
