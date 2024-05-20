import { OmitType, ApiProperty } from '@nestjs/swagger'
import { IdDto, PaginationResponse } from '@/core/swagger'
import { GroupDto } from './dto'
import { ClubDto } from '@/modules/club/swagger'
import { DirectionDto } from '@/modules/direction/swagger'
import { UserReturnSelect } from '@/modules/user/swagger'

class Group extends GroupDto {
	@ApiProperty({
		type: () => ClubDto
	})
	public readonly club: ClubDto

	@ApiProperty({
		type: () => DirectionDto
	})
	public readonly direction: DirectionDto

	@ApiProperty({
		type: () => UserReturnSelect,
		isArray: true
	})
	public readonly users: UserReturnSelect
}

export class GetGroupByIdOk extends Group {}

export class GetAllGroupsOk extends PaginationResponse {
	@ApiProperty({ isArray: true })
	public readonly items: Group
}

export class CreateGroupOk extends OmitType(Group, ['club', 'direction', 'users']) {
	@ApiProperty({
		type: () => IdDto
	})
	public readonly direction: IdDto

	@ApiProperty({
		type: () => IdDto
	})
	public readonly club: IdDto
}

export class UpdateGroupOk extends CreateGroupOk {}
