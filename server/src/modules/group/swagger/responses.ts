import { ApiProperty, OmitType } from '@nestjs/swagger'
import { PickType } from '@nestjs/swagger'
import { PaginationResponse } from '@/core/swagger'
import { CreateGroupDto } from '../dto'
import { GetDirectionByIdOk } from '@/modules/direction/swagger'
import { GetClubByIdOk } from '@/modules/club/swagger'

class GroupDirection extends OmitType(GetDirectionByIdOk, ['groups']) {}

export class GetGroupByIdOk extends PickType(CreateGroupDto, ['name']) {
	@ApiProperty({
		default: 5
	})
	id: number

	@ApiProperty()
	direction: GroupDirection

	@ApiProperty({
		type: () => OmitType(GetClubByIdOk, ['groups', 'users', 'admin'])
	})
	club: GetClubByIdOk

	// FIX
	// @ApiProperty({
	// 	isArray: true
	// })
	// users: GetUserByIdOk
}

export class GetAllGroupsOk extends PaginationResponse {
	@ApiProperty({ isArray: true })
	items: GetGroupByIdOk
}

export class CreateGroupOk extends GetGroupByIdOk {}

export class UpdateGroupOk extends GetGroupByIdOk {}
