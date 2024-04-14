import { BaseEntity } from '@/core/database/entity'
import { ClubEntity } from '@/modules/club/entities'
import { GroupEntity } from '@/modules/group/entities'
import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm'

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
}
