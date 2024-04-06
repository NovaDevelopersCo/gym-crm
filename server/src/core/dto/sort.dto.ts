import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsOptional } from 'class-validator'
import { ESortOrder } from '../enums'

class ASortDto {
	sortBy: any
}

export class SortDto extends ASortDto {
	@ApiProperty({
		default: ESortOrder.ASC,
		required: false,
		enum: ESortOrder,
		description: 'Порядок сортировки'
	})
	@IsOptional()
	@IsEnum(ESortOrder, { message: "Параметр 'Порядок сортировки' невалиден" })
	sortOrder: 'ASC' | 'DESC' = ESortOrder.ASC
}
