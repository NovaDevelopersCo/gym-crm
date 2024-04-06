import { ApiProperty } from '@nestjs/swagger'
import { GroupEntity } from '../entities'
import { OmitType } from '@nestjs/swagger'
import { UserEntity } from '@/modules/user/entities'
import { PaginationResponse } from '@/core/swagger'

export class GetAllGroupsOk extends PaginationResponse {
	@ApiProperty({
		default: [
			{
				name: 'Группа 2',
				id: 33,
				users: ['список пользователей....'],
				club: {
					id: 8,
					address: 'г. Москва ул. Кротова д. 120',
					name: 'Super Club'
				},
				trainer: {
					id: 76,
					fio: 'Галоша Алексей Петрович',
					email: 'trainer1@gmail.com',
					role: 'trainer'
				},
				direction: {
					id: 67,
					name: 'Карате'
				}
			},
			{
				name: 'Группа 54',
				id: 11,
				users: ['список пользователей....'],
				club: {
					id: 90,
					address: 'г. Москва ул. Пышина д. 19',
					name: 'Mass Club'
				},
				trainer: {
					id: 44,
					fio: 'Сваровский Геннадий Иванович',
					email: 'trainer2@gmail.com',
					role: 'trainer'
				},
				direction: {
					id: 11,
					name: 'Бокс'
				}
			}
		]
	})
	items: GroupEntity[]
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
			id: 107,
			address: 'г. Москва ул. Кротова д. 120',
			name: 'Super Club'
		}
	})
	club: number

	@ApiProperty({
		default: {
			id: 56,
			fio: 'Галоша Алексей Петрович',
			email: 'trainer1@gmail.com',
			role: 'trainer'
		}
	})
	trainer: number

	@ApiProperty({
		default: 5
	})
	id: number

	@ApiProperty({
		default: 44,
		name: 'Карате'
	})
	direction: number
}

export class CreateGroupOk extends OmitType(GetGroupByIdOk, ['users']) {}
export class UpdateGroupOk extends GetGroupByIdOk {}
