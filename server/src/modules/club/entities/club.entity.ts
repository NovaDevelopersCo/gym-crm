import { BaseEntity } from '@/core/database'
import { GroupEntity } from '@/modules/group/entities'
import { StaffEntity } from '@/modules/staff/entities'
import { Column, Entity, JoinColumn, OneToOne, OneToMany } from 'typeorm'

@Entity('Club')
export class ClubEntity extends BaseEntity {
	@Column()
	address: string

	@Column()
	image: string

	@Column()
	name: string

	@OneToOne(() => StaffEntity)
	@JoinColumn()
	admin: number

	@OneToMany(() => GroupEntity, group => group.id)
	groups: number[]
}
