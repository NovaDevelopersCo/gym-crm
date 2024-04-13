import { ApiProperty } from '@nestjs/swagger'

import { GroupEntity } from '@/modules/group/entities'

import { PaginationResponse } from '@/core/swagger'
import { CreateDirectionDto } from '../dto'

export class UpdateDirectionOk extends CreateDirectionDto {
	@ApiProperty({ default: 111 })
	id: number

	@ApiProperty({ default: ['список групп....'], required: false })
	groups?: GroupEntity[]
}

export class CreateDirectionOk extends UpdateDirectionOk {}
export class GetDirectionByIdOk extends UpdateDirectionOk {}
export class GetAllDirectionsOk extends PaginationResponse {
	@ApiProperty({
		isArray: true
	})
	items: UpdateDirectionOk
}
