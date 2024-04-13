import { IntersectionType, ApiProperty, PickType, OmitType } from '@nestjs/swagger'
import { StaffEntity } from '@/modules/staff/entities'
import { UserEntity } from '@/modules/user/entities'
import { PaginationResponse } from '@/core/swagger'
import { CreateClubDto } from '../dto'
import { GetStaffByIdOk } from '@/modules/staff/swagger'
import { GetGroupByIdOk } from '@/modules/group/swagger'

class ClubGroup extends PickType(GetGroupByIdOk, ['id', 'name']) {}

export class GetClubByIdOk extends OmitType(CreateClubDto, ['admin']) {
	@ApiProperty({
		default: 1
	})
	id: number

	@ApiProperty({
		isArray: true
	})
	groups: ClubGroup

	// FIX - add users list (extends from user/swagger/response.ts)
	@ApiProperty({
		default: ['список пользователей....']
	})
	users: UserEntity[]

	@ApiProperty()
	admin: GetStaffByIdOk
}

export class GetAllClubsOk extends PaginationResponse {
	@ApiProperty({
		isArray: true
	})
	items: GetClubByIdOk
}

export class CreateClubOk extends PickType(GetClubByIdOk, ['address', 'id', 'name']) {
	@ApiProperty({
		default: {
			id: 1
		}
	})
	admin: StaffEntity
}
export class UpdateClubOk extends IntersectionType(
	GetClubByIdOk,
	PickType(CreateClubOk, ['admin'])
) {}
