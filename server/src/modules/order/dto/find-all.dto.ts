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
	sortBy: ESort = ESort.CREATE_DATE

	@ArrayIdsQueryDecorator({
		field: 'users',
		description: ''
	})
	users?: number[]

	@PriceQueryDecorator({ description: '', field: 'total' })
	total?: number | number[]
}
