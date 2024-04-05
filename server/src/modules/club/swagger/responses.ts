import { ApiProperty, PickType } from '@nestjs/swagger'
import { ClubEntity } from '../entities'
import { StaffEntity } from '@/modules/staff/entities'
import { GroupEntity } from '@/modules/group/entities'
import { UserEntity } from '@/modules/user/entities'

export class GetAllClubsOk {
	@ApiProperty({
		default: [
			{
				id: 1,
				address: 'г. Москва ул. Шишкина д. 13',
				name: 'Mass Club',
				admin: {
					id: 1,
					fio: 'Солодова Елизавета Павловна',
					email: 'admin1@gmail.com',
					role: 'admin'
				},
				groups: ['список групп....'],
				users: ['список пользователей....']
			},
			{
				id: 4,
				address: 'г. Москва ул. Капитошкина д. 98',
				name: 'Star Club',
				admin: {
					id: 8,
					fio: 'Шишкин Николай Сергеевич',
					email: 'admin2@gmail.com',
					role: 'admin'
				},
				groups: ['список групп....'],
				users: ['список пользователей....']
			}
		]
	})
	clubs: ClubEntity[]
}

export class GetClubByIdOk {
	@ApiProperty({
		default: 'г. Москва ул. Шишкина д. 13'
	})
	address: string

	@ApiProperty({
		default: 'Mass Club'
	})
	name: string
	@ApiProperty({
		default: 1
	})
	id: number
	@ApiProperty({
		default: {
			id: 111,
			fio: 'Шишкин Николай Сергеевич',
			email: 'admin2@gmail.com',
			role: 'admin'
		}
	})
	admin: StaffEntity
	@ApiProperty({
		default: ['список групп....']
	})
	groups: GroupEntity[]
	@ApiProperty({
		default: ['список пользователей....']
	})
	users: UserEntity[]
}

export class CreateClubOk extends PickType(GetClubByIdOk, ['address', 'id', 'name']) {
	@ApiProperty({
		default: {
			id: 1
		}
	})
	admin: StaffEntity
}
export class UpdateClubOk extends CreateClubOk {}
