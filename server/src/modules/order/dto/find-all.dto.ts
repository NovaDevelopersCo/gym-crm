import { FullQueryDto } from '@/core/dto'
import { QuerySearch } from '@/core/decorators'
import { PriceQueryDecorator } from '@/core/query'
import { ArrayIdsQueryDecorator } from '@/core/query'

enum ESort {
	CREATE_DATE = 'createDate',
	TOTAL = 'total'
}

export class FindAllOrderDto extends FullQueryDto {
	@QuerySearch(ESort, 'Сортировка по', "Параметр 'Сортировка по' невалиден")
	public readonly sortBy: ESort = ESort.CREATE_DATE

	@ArrayIdsQueryDecorator({
		field: 'users',
		description: 'Массив id пользователей'
	})
	public readonly users?: number[]

	@PriceQueryDecorator({
		description: 'Интервал или конкретная цена за весь заказ ',
		field: 'total'
	})
	public readonly total?: number | number[]

	// TODO: продумать что лучше users или user
	// @IsOptional()
	// @Type(() => Number)
	// @IsInt()
	// public readonly user: number
}
