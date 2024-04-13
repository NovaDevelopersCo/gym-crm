import { ApiProperty } from '@nestjs/swagger'
import { PickType } from '@nestjs/swagger'
import { PaginationResponse } from '@/core/swagger'
import { CreateGroupDto } from '../dto'
import { GetDirectionByIdOk } from '@/modules/direction/swagger'
import { GetClubByIdOk } from '@/modules/club/swagger'

export class GetGroupByIdOk extends PickType(CreateGroupDto, ['name']) {
	@ApiProperty({
		default: 5
	})
	id: number

	@ApiProperty()
	direction: GetDirectionByIdOk

	@ApiProperty()
	club: GetClubByIdOk
}

export class GetAllGroupsOk extends PaginationResponse {
	@ApiProperty({ isArray: true })
	items: GetGroupByIdOk
}

export class CreateGroupOk extends GetGroupByIdOk {}

export class UpdateGroupOk extends GetGroupByIdOk {}
