import { ApiProperty, OmitType } from '@nestjs/swagger'
import { PaginationResponse } from '@/core/swagger'
import { DirectionEntity } from '../entities'

export class DirectionDto extends DirectionEntity {}

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
