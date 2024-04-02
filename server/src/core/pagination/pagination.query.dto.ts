import { Type } from 'class-transformer'
import { IsInt, IsOptional } from 'class-validator'

export class PaginationQueryDto {
	@IsOptional()
	@Type(() => Number)
	@IsInt()
	count: number = 10

	@IsOptional()
	@Type(() => Number)
	@IsInt()
	page: number = 1
}
