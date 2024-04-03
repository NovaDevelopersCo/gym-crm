import { ApiProperty, PartialType, PickType } from '@nestjs/swagger'
import { ECreateStaffRole } from '../enums'
import { DirectionEntity } from '@/modules/direction/entities'
import { GroupEntity } from '@/modules/group/entities'
import { ClubEntity } from '@/modules/club/entities'
import { StaffEntity } from '@/modules/staff/entities'
import { UserEntity } from '@/modules/user/entities'

export class AuthOk {
	@ApiProperty({
		default:
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
	})
	accessToken: string
}

class Profile {
	@ApiProperty()
	fio: string

	@ApiProperty({
		enum: ECreateStaffRole
	})
	role: ECreateStaffRole

	@ApiProperty()
	email: string

	@ApiProperty()
	id: string
}

export class RefreshOk extends AuthOk {
	@ApiProperty({
		default: {
			fio: 'Васильев Василий Васильевич',
			role: 'admin / trainer',
			email: 'email@email.com',
			id: '35'
		}
	})
	profile: Profile
}

export class CreateStaffOk {
	@ApiProperty({ enum: ECreateStaffRole, default: 'admin / trainer' })
	role: ECreateStaffRole

	@ApiProperty({
		default: 'email@email.com'
	})
	email: string

	@ApiProperty({
		default: '35'
	})
	id: string
}

export class DeleteOk {
	@ApiProperty({ default: true })
	message: boolean
}

export class UpdateDirectionOk {
	@ApiProperty({ default: 'Кикбоксинг' })
	name: string
	@ApiProperty({ default: 111 })
	id: number
	@ApiProperty({ default: ['список групп....'], required: false })
	groups?: GroupEntity[]
}

export class CreateDirectionOk extends PickType(UpdateDirectionOk, ['id', 'name']) {}
export class GetDirectionByIdOk extends PartialType(UpdateDirectionOk) {}
export class GetAllDirectionsOk {
	@ApiProperty({
		default: [
			{ id: 1, name: 'Кикбоксинг' },
			{ id: 2, name: 'Бокс', groups: ['список групп....'] }
		]
	})
	directions: DirectionEntity[]
}

export class GetAllClubsOk {
	@ApiProperty({
		default: [
			{
				id: 1,
				address: 'г. Москва ул. Шишкина д. 13',
				name: 'Mass Club',
				admin: { id: 1 },
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
			id: 111
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

export class CreateClubOk extends PickType(GetClubByIdOk, ['address', 'admin', 'id', 'name']) {}
export class UpdateClubOk extends CreateClubOk {}
