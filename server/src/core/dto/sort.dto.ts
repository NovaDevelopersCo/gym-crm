import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsOptional } from 'class-validator'
import { ESortOrder } from '../enums'

class ASortDto {
	public readonly sortBy: string
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
	public readonly sortOrder: 'ASC' | 'DESC' = ESortOrder.ASC
}
