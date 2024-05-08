import { PickType, OmitType, ApiProperty } from '@nestjs/swagger'
import { PaginationResponse } from '@/core/swagger'
import { UserClub } from '@/modules/club/swagger'
import { GroupEntity } from '../entities'

export class GroupDto extends GroupEntity {}

export class GetGroupByIdOk extends GroupDto {}

export class GetAllGroupsOk extends PaginationResponse {
	@ApiProperty({ isArray: true })
	public readonly items: GroupDto
}

export class CreateGroupOk extends GroupDto {}

export class UpdateGroupOk extends GroupDto {}

export class ClubGroup extends PickType(GroupDto, ['id', 'name']) {}

export class DirectionGroup extends PickType(GroupDto, ['id', 'name']) {}

export class UserGroup extends OmitType(GroupDto, ['direction', 'club']) {
	@ApiProperty({
		type: () => UserClub
	})
	public readonly club: UserClub
}

export class UserGroupSmall extends PickType(GroupDto, ['id', 'name']) {}
