import { ApiProperty } from '@nestjs/swagger'
import { GroupEntity } from '../entities'
import { OmitType } from '@nestjs/swagger'
import { UserEntity } from '@/modules/user/entities'

export class GetAllGroupsOk {
	@ApiProperty({
		default: [
			{
				name: 'Группа 2',
				id: 33,
				users: ['список пользователей....'],
				club: {
					id: 8
				},
				trainer: {
					id: 76
				},
				direction: {
					id: 67
				}
			},
			{
				name: 'Группа 54',
				id: 11,
				users: ['список пользователей....'],
				club: {
					id: 90
				},
				trainer: {
					id: 44
				},
				direction: {
					id: 11
				}
			}
		]
	})
	groups: GroupEntity[]
}

export class GetGroupByIdOk {
	@ApiProperty({
		default: 'Группа 2'
	})
	name: string

	@ApiProperty({
		default: ['список пользователей....']
	})
	users: UserEntity

	@ApiProperty({
		default: {
			id: 107
		}
	})
	club: number

	@ApiProperty({
		default: {
			id: 56
		}
	})
	trainer: number

	@ApiProperty({
		default: 5
	})
	id: number

	@ApiProperty({
		default: 44
	})
	direction: number
}

export class CreateGroupOk extends OmitType(GetGroupByIdOk, ['users']) {}
export class UpdateGroupOk extends GetGroupByIdOk {}
