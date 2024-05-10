import { BaseEntity } from '@/core/database/entity'
import { Column, Entity, ManyToMany, ManyToOne } from 'typeorm'
import { DirectionEntity } from '@/modules/direction/entities'
import { ClubEntity } from '@/modules/club/entities'
import { UserEntity } from '@/modules/user/entities'
import { GroupPropertiesSwagger } from '../swagger/properties'

@Entity('Group')
export class GroupEntity extends BaseEntity {
	@GroupPropertiesSwagger.name_()
	@Column({
		unique: true
	})
	public readonly name: string

	@GroupPropertiesSwagger.direction()
	@ManyToOne(() => DirectionEntity, direction => direction.groups, { onDelete: 'SET NULL' })
	public readonly direction: DirectionEntity

	@GroupPropertiesSwagger.club()
	@ManyToOne(() => ClubEntity, club => club.groups, { onDelete: 'SET NULL' })
	public readonly club: ClubEntity

	@GroupPropertiesSwagger.users()
	@ManyToMany(() => UserEntity, user => user.groups)
	public readonly users: UserEntity[]
}
