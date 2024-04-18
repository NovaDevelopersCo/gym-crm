import { ApiProperty, OmitType, PickType } from '@nestjs/swagger'
import { CreateUserDto as CUserDto } from '../dto'
import { UserGroup, UserGroupSmall } from '@/modules/group/swagger'
import { UserClub } from '@/modules/club/swagger'
import { PaginationResponse } from '@/core/swagger'

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

	@ApiProperty({
		example: 1
	})
	id: number

	@ApiProperty({
		example: 'email@gmail.com'
	})
	email: string

	@ApiProperty({
		example: 'Иванов Иван Иванович'
	})
	fio: string

	@ApiProperty({
		example: 'Посоветовал друг, увидел в интернете'
	})
	howKnow: string

	@ApiProperty({
		example: 'my_account'
	})
	instagram: string
}

export class CreateUserOk extends OmitType(UserDto, ['groups']) {
	@ApiProperty({
		example: 1
	})
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
