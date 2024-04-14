import { IntersectionType, ApiProperty, PickType, OmitType } from '@nestjs/swagger'
import { StaffEntity } from '@/modules/staff/entities'
import { PaginationResponse } from '@/core/swagger'
import { CreateClubDto } from '../dto'
import { StaffDto } from '@/modules/staff/swagger'
import { ClubGroup } from '@/modules/group/swagger'
import { ClubUser } from '@/modules/user/swagger'

export class ClubDto extends OmitType(CreateClubDto, ['admin']) {
	@ApiProperty({
		default: 1
	})
	id: number

	@ApiProperty({
		isArray: true,
		type: () => ClubGroup
	})
	groups: ClubGroup

	@ApiProperty({
		isArray: true,
		type: () => ClubUser
	})
	users: ClubUser

	@ApiProperty()
	admin: StaffDto
}

export class GetClubByIdOk extends ClubDto {}

export class GetAllClubsOk extends PaginationResponse {
	@ApiProperty({
		isArray: true
	})
	items: ClubDto
}

export class CreateClubOk extends PickType(ClubDto, ['address', 'id', 'name']) {
	@ApiProperty({
		default: {
			id: 1
		}
	})
	admin: StaffEntity
}
export class UpdateClubOk extends IntersectionType(ClubDto, PickType(CreateClubOk, ['admin'])) {}
export class GroupClub extends OmitType(ClubDto, ['groups', 'users', 'admin']) {}
export class UserClub extends PickType(ClubDto, ['id', 'address', 'name']) {}
