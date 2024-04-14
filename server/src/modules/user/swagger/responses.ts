import { ApiProperty, OmitType } from '@nestjs/swagger'
import { CreateUserDto as CUserDto } from '../dto'
import { UserGroup, UserGroupSmall } from '@/modules/group/swagger'
import { UserClub } from '@/modules/club/swagger'
import { PaginationResponse } from '@/core/swagger'

export class CreateUserOk extends OmitType(CUserDto, ['groups']) {
	@ApiProperty({
		default: 1
	})
	id: number

	@ApiProperty({ isArray: true, type: () => UserGroup })
	groups: UserGroup
}

export class UserDto extends OmitType(CUserDto, ['groups', 'club']) {
	@ApiProperty({
		isArray: true,
		type: () => UserGroupSmall
	})
	groups: UserGroupSmall

	@ApiProperty({
		type: () => UserClub
	})
	club: UserClub

	@ApiProperty({
		default: 1
	})
	id: number
}

export class GetUserByIdOk extends UserDto {}

export class GetAllUsersOk extends PaginationResponse {
	@ApiProperty({ isArray: true })
	items: UserDto
}

export class ClubUser extends OmitType(UserDto, ['groups', 'club']) {}
export class GroupUser extends OmitType(UserDto, ['groups', 'club']) {}
