import { FullQueryDto } from '@/core/dto'
import { QuerySearch } from '@/core/decorators'
import { PriceQueryDecorator } from '@/core/query'
import { ArrayIdsQueryDecorator } from '@/core/query'
import { IsOptional, IsInt } from 'class-validator'
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
	@ArrayIdsQueryDecorator({
		field: 'users',
		description: ''
	})
	public readonly users?: number[]

	@PriceQueryDecorator({ description: '', field: 'total' })
	public readonly total?: number | number[]
}
