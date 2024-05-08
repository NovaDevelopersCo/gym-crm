import { ApiProperty, OmitType } from '@nestjs/swagger'
import { UserGroup } from '@/modules/group/swagger'
import { PaginationResponse } from '@/core/swagger'
import { UserEntity } from '../entities'

export class UserDto extends UserEntity {}

export class CreateUserOk extends OmitType(UserDto, ['groups']) {
	@ApiProperty({ isArray: true, type: () => UserGroup })
	groups: UserGroup
}

export class GetUserByIdOk extends UserDto {}

export class GetAllUsersOk extends PaginationResponse {
	@ApiProperty({ isArray: true })
	items: UserDto
}

export class ClubUser extends OmitType(UserDto, ['groups', 'club']) {}
export class GroupUser extends OmitType(UserDto, ['groups', 'club']) {}
export class UserAbonementUser extends OmitType(UserDto, ['groups', 'club']) {}
