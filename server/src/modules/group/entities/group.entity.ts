import { BaseEntity } from '@/core/database/entity'
import { Column, Entity, ManyToMany, ManyToOne } from 'typeorm'
import { DirectionEntity } from '@/modules/direction/entities'
import { ClubEntity } from '@/modules/club/entities'
import { UserEntity } from '@/modules/user/entities'
import { ApiProperty } from '@nestjs/swagger'

@Entity('Group')
export class GroupEntity extends BaseEntity {
	@ApiProperty({
		example: 'Группа 1',
		description: 'Название группы'
	})
	@Column({
		unique: true
	})
	name: string

	@ApiProperty({
		description: 'Направление группы',
		type: () => DirectionEntity
	})
	@ManyToOne(() => DirectionEntity, direction => direction.groups, { onDelete: 'SET NULL' })
	direction: DirectionEntity

	@ApiProperty({
		description: 'Клуб, к которому относится группа',
		type: () => ClubEntity
	})
	@ManyToOne(() => ClubEntity, club => club.groups, { onDelete: 'SET NULL' })
	club: ClubEntity

	@ApiProperty({
		description: 'Посетители',
		type: () => UserEntity,
		isArray: true
	})
	@ManyToMany(() => UserEntity, user => user.groups)
	users: UserEntity[]
}
