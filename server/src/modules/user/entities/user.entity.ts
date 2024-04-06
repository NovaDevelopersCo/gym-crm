import { BaseEntity } from '@/core/database/entity'
import { AbonementEntity } from '@/modules/abonement/entities'
import { ClubEntity } from '@/modules/club/entities'
import { GroupEntity } from '@/modules/group/entities'
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne } from 'typeorm'

@Entity('Users')
export class UserEntity extends BaseEntity {
	@Column({
		unique: true
	})
	email: string

	@Column({
		unique: true
	})
	phone: number

	@Column()
	fio: string

	@Column({
		unique: true
	})
	cardNumber: number

	// may be timestamp??
	@Column()
	birthday?: string

	@Column()
	age?: number

	@Column()
	experienceBefore?: string

	@OneToOne(() => AbonementEntity)
	@JoinColumn()
	abonement: AbonementEntity

	@Column()
	howKnow?: string

	@ManyToMany(() => GroupEntity, group => group.users)
	@JoinTable()
	groups: GroupEntity[]

	@ManyToOne(() => ClubEntity, club => club.users)
	club: ClubEntity
}
