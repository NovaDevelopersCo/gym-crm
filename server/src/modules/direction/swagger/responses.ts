import { ApiProperty, PickType, OmitType } from '@nestjs/swagger'

import { PaginationResponse } from '@/core/swagger'
import { CreateDirectionDto } from '../dto'
import { GetGroupByIdOk } from '@/modules/group/swagger'

class DirectionDto extends CreateDirectionDto {
	@ApiProperty({ default: 111 })
	id: number

	// FIX create class DirectionGroup here and use it into type: () => DirectionGroup
	@ApiProperty({ isArray: true, type: () => PickType(GetGroupByIdOk, ['id', 'name']) })
	groups?: GetGroupByIdOk
}

export class UpdateDirectionOk extends DirectionDto {}

export class CreateDirectionOk extends OmitType(DirectionDto, ['groups']) {}
export class GetDirectionByIdOk extends DirectionDto {}
export class GetAllDirectionsOk extends PaginationResponse {
	@ApiProperty({
		isArray: true
	})
	items: DirectionDto
}
