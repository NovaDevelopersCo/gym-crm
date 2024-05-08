import { FullQueryDto } from '@/core/dto'
import { QuerySearch } from '@/core/decorators'
import { IsInt, IsOptional } from 'class-validator'
import { Type } from 'class-transformer'

enum ESort {
	CREATE_DATE = 'createDate',
	TOTAL = 'total'
}

export class FindAllOrderDto extends FullQueryDto {
	@QuerySearch(ESort, 'Сортировка по', "Параметр 'Сортировка по' невалиден")
	public readonly sortBy: ESort = ESort.CREATE_DATE

	@IsOptional()
	@Type(() => Number)
	@IsInt()
	public readonly user: number
}
