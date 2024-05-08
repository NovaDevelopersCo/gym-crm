import { FullQueryDto } from '@/core/dto'
import { QuerySearch } from '@/core/decorators'
import { productValidation } from '../validation'
import { ArrayIdsQueryDecorator, StringQueryDecorator } from '@/core/query'
import { PriceQueryDecorator } from '@/core/query'

enum ESort {
	NAME = 'name',
	PRICE = 'price',
	CREATE_DATE = 'createDate'
}

export class FindAllProductDto extends FullQueryDto {
	@QuerySearch(ESort, 'Сортировка по', "Параметр 'Сортировка по' невалиден")
	sortBy: ESort = ESort.CREATE_DATE

	@StringQueryDecorator({
		maxLength: productValidation.name.maxLength,
		description: '',
		field: 'name'
	})
	name?: string

	@ArrayIdsQueryDecorator({
		field: 'users',
		description: ''
	})
	users?: number[]

	@ArrayIdsQueryDecorator({
		field: 'clubs',
		description: ''
	})
	clubs?: number[]

	@PriceQueryDecorator({ description: '', field: 'price' })
	price?: number | number[]
}
