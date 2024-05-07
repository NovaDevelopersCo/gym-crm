import { ApiProperty, OmitType } from '@nestjs/swagger'
import { PaginationResponse, CommonDtoSwagger } from '@/core/swagger'
import { DirectionGroup } from '@/modules/group/swagger'
import { DirectionDtoSwagger } from './dto'

export class DirectionDto {
	@CommonDtoSwagger.id()
	id: number

	@ApiProperty({ isArray: true, type: () => DirectionGroup })
	groups?: DirectionGroup

	@DirectionDtoSwagger.name_()
	name: string
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
