import { ApiProperty, OmitType } from '@nestjs/swagger'
import { PaginationResponse } from '@/core/swagger'
import { DirectionDto } from './dto'
import { GroupDto } from '@/modules/group/swagger'

class Direction extends DirectionDto {
	@ApiProperty({
		type: () => GroupDto,
		isArray: true
	})
	public readonly groups: GroupDto
}

export class UpdateDirectionOk extends Direction {}

export class CreateDirectionOk extends OmitType(Direction, ['groups']) {}
export class GetDirectionByIdOk extends Direction {}
export class GetAllDirectionsOk extends PaginationResponse {
	@ApiProperty({
		isArray: true
	})
	public readonly items: Direction
}
