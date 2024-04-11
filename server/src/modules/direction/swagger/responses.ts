import { ApiProperty } from '@nestjs/swagger'

import { DirectionEntity } from '@/modules/direction/entities'
import { GroupEntity } from '@/modules/group/entities'

import { PaginationResponse } from '@/core/swagger'

export class UpdateDirectionOk {
	@ApiProperty({ default: 'Кикбоксинг' })
	name: string
	@ApiProperty({ default: 111 })
	id: number
	@ApiProperty({ default: ['список групп....'], required: false })
	groups?: GroupEntity[]
}

export class CreateDirectionOk extends UpdateDirectionOk {}
export class GetDirectionByIdOk extends UpdateDirectionOk {}
export class GetAllDirectionsOk extends PaginationResponse {
	@ApiProperty({
		default: [
			{ id: 1, name: 'Кикбоксинг', groups: ['список групп....'] },
			{ id: 2, name: 'Бокс', groups: ['список групп....'] }
		]
	})
	items: DirectionEntity[]
}
