import { ApiProperty, OmitType } from '@nestjs/swagger'

import { PaginationResponse } from '@/core/swagger'
import { DirectionGroup } from '@/modules/group/swagger'
import { PropertyDecoratorsSwagger } from '@/core/swagger'
import { DirectionPropertiesSwagger } from './properties'

export class DirectionDto {
	@PropertyDecoratorsSwagger.id()
	id: number

	@ApiProperty({ isArray: true, type: () => DirectionGroup })
	groups?: DirectionGroup

	@DirectionPropertiesSwagger.name_()
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
