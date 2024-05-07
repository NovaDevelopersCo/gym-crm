import { ApiProperty, OmitType, PickType } from '@nestjs/swagger'
import { CreateUserDto as CUserDto } from '../dto'
import { UserGroup, UserGroupSmall } from '@/modules/group/swagger'
import { UserClub } from '@/modules/club/swagger'
import { CommonDtoSwagger, PaginationResponse } from '@/core/swagger'
import { UserDtoSwagger } from './dto'

export class UserDto extends PickType(CUserDto, ['birthday', 'phone']) {
	@ApiProperty({
		isArray: true,
		type: () => UserGroupSmall
	})
	groups: UserGroupSmall

	@ApiProperty({
		type: () => UserClub
	})
	club: UserClub

	@CommonDtoSwagger.id()
	id: number

	@CommonDtoSwagger.email()
	email: string

	@UserDtoSwagger.fio()
	fio: string

	@UserDtoSwagger.howKnow()
	howKnow: string

	@UserDtoSwagger.instagram()
	instagram: string
}

export class CreateUserOk extends OmitType(UserDto, ['groups']) {
	@CommonDtoSwagger.id()
	id: number

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
