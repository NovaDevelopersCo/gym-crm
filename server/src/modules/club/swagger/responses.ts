import { IntersectionType, ApiProperty, PickType, OmitType } from '@nestjs/swagger'
import { PaginationResponse } from '@/core/swagger'
import { CreateClubDto } from '../dto'
import { StaffDto } from '@/modules/staff/swagger'
import { ClubGroup } from '@/modules/group/swagger'
import { ClubUser } from '@/modules/user/swagger'

export class ClubDto extends OmitType(CreateClubDto, ['admin', 'name', 'address']) {
	@ApiProperty({
		example: 1
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

	@ApiProperty({
		type: () => StaffDto
	})
	admin: StaffDto

	@ApiProperty({
		example: 'Mass Club'
	})
	name: string

	@ApiProperty({
		example: 'г. Москва ул. Шишкина д. 45'
	})
	address: string
}

export class GetClubByIdOk extends ClubDto {}

export class GetAllClubsOk extends PaginationResponse {
	@ApiProperty({
		isArray: true
	})
	items: ClubDto
}

class ClubAdmin {
	@ApiProperty({
		example: 1
	})
	id: number
}

export class CreateClubOk extends PickType(ClubDto, ['address', 'id', 'name']) {
	@ApiProperty()
	admin: ClubAdmin
}
export class UpdateClubOk extends IntersectionType(ClubDto, ClubAdmin) {}
export class GroupClub extends OmitType(ClubDto, ['groups', 'users', 'admin']) {}
export class UserClub extends PickType(ClubDto, ['id', 'address', 'name']) {}
export class StaffClub extends OmitType(GetClubByIdOk, ['groups', 'users', 'admin']) {}
