import { ApiProperty, OmitType } from '@nestjs/swagger'

import { PaginationResponse } from '@/core/swagger'
import { CreateDirectionDto } from '../dto'
import { DirectionGroup } from '@/modules/group/swagger'

export class DirectionDto extends CreateDirectionDto {
	@ApiProperty({ default: 111 })
	id: number

	@ApiProperty({ isArray: true, type: () => DirectionGroup })
	groups?: DirectionGroup
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

export class GroupDirection extends OmitType(DirectionDto, ['groups']) {}
