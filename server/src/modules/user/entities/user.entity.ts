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
	phone: string

	@Column()
	fio: string

	@Column({
		unique: true
	})
	cardNumber: string

	@Column({ type: 'date', nullable: true })
	birthday?: string

	@Column({ nullable: true })
	experienceBefore?: string

	@OneToOne(() => AbonementEntity)
	@JoinColumn()
	abonement: AbonementEntity

	@Column({ nullable: true })
	howKnow?: string

	@ManyToMany(() => GroupEntity, group => group.users)
	@JoinTable()
	groups: GroupEntity[]

	@ManyToOne(() => ClubEntity, club => club.users, { onDelete: 'SET NULL' })
	club: ClubEntity
}
