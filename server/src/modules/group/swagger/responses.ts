import { ApiProperty } from '@nestjs/swagger'
import { PickType, OmitType } from '@nestjs/swagger'
import { PaginationResponse } from '@/core/swagger'
import { GroupDirection } from '@/modules/direction/swagger'
import { GroupClub, UserClub } from '@/modules/club/swagger'
import { GroupUser } from '@/modules/user/swagger'

export class GroupDto {
	@ApiProperty({
		example: 5
	})
	id: number

	@ApiProperty()
	direction: GroupDirection

	@ApiProperty({ type: () => GroupClub })
	club: GroupClub

	@ApiProperty({ isArray: true })
	users: GroupUser

	@ApiProperty({
		example: 'Группа 1'
	})
	name: string
}

export class GetGroupByIdOk extends GroupDto {}

export class GetAllGroupsOk extends PaginationResponse {
	@ApiProperty({ isArray: true })
	items: GroupDto
}

export class CreateGroupOk extends GroupDto {}

export class UpdateGroupOk extends GroupDto {}

export class ClubGroup extends PickType(GroupDto, ['id', 'name']) {}

export class DirectionGroup extends PickType(GroupDto, ['id', 'name']) {}

export class UserGroup extends OmitType(GroupDto, ['direction', 'club']) {
	@ApiProperty({
		type: () => UserClub
	})
	club: UserClub
}

export class UserGroupSmall extends PickType(GroupDto, ['id', 'name']) {}
