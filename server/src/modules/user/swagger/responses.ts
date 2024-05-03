import { ApiProperty, OmitType, PickType } from '@nestjs/swagger'
import { CreateUserDto as CUserDto } from '../dto'
import { UserGroup, UserGroupSmall } from '@/modules/group/swagger'
import { UserClub } from '@/modules/club/swagger'
import { PropertyDecoratorsSwagger, PaginationResponse } from '@/core/swagger'
import { UserPropertiesSwagger } from './properties'

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

	@PropertyDecoratorsSwagger.id()
	id: number

	@PropertyDecoratorsSwagger.email()
	email: string

	@UserPropertiesSwagger.fio()
	fio: string

	@UserPropertiesSwagger.howKnow()
	howKnow: string

	@UserPropertiesSwagger.instagram()
	instagram: string
}

export class CreateUserOk extends OmitType(UserDto, ['groups']) {
	@PropertyDecoratorsSwagger.id()
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
