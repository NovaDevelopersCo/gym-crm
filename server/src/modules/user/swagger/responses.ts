import { ApiProperty, OmitType, PickType } from '@nestjs/swagger'
import { CreateUserDto as CUserDto } from '../dto'
import { GetGroupByIdOk } from '@/modules/group/swagger'
import { GetClubByIdOk } from '@/modules/club/swagger'
import { PaginationResponse } from '@/core/swagger'

class UserClub extends PickType(GetClubByIdOk, ['id', 'address', 'name']) {}

class UserGroup extends OmitType(GetGroupByIdOk, ['direction', 'club']) {
	@ApiProperty()
	club: UserClub
}

export class CreateUserOk extends OmitType(CUserDto, ['groups']) {
	@ApiProperty({
		default: 1
	})
	id: number

	@ApiProperty({ isArray: true })
	groups: UserGroup
}

class GroupDto extends PickType(GetGroupByIdOk, ['id', 'name'] as const) {}
class ClubDto extends PickType(GetClubByIdOk, ['id', 'name', 'address'] as const) {}
export class GetUserByIdOk extends OmitType(CUserDto, ['groups', 'club'] as const) {
	@ApiProperty({
		isArray: true
	})
	groups: GroupDto

	@ApiProperty()
	club: ClubDto
}

export class GetAllUsersOk extends PaginationResponse {
	@ApiProperty({ isArray: true })
	items: GetUserByIdOk
}
