import { ApiProperty } from '@nestjs/swagger'

import { PickType } from '@nestjs/swagger'

import { DirectionEntity } from '@/modules/direction/entities'
import { GroupEntity } from '@/modules/group/entities'

export class UpdateDirectionOk {
	@ApiProperty({ default: 'Кикбоксинг' })
	name: string
	@ApiProperty({ default: 111 })
	id: number
	@ApiProperty({ default: ['список групп....'], required: false })
	groups?: GroupEntity[]
}

export class CreateDirectionOk extends PickType(UpdateDirectionOk, ['id', 'name']) {}
export class GetDirectionByIdOk extends UpdateDirectionOk {}
export class GetAllDirectionsOk {
	@ApiProperty({
		default: [
			{ id: 1, name: 'Кикбоксинг' },
			{ id: 2, name: 'Бокс', groups: ['список групп....'] }
		]
	})
	directions: DirectionEntity[]
}
