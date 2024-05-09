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
	public readonly sortBy: ESort = ESort.CREATE_DATE

	@StringQueryDecorator({
		maxLength: productValidation.name.maxLength,
		description: '',
		field: 'name'
	})
	public readonly name?: string

	@ArrayIdsQueryDecorator({
		field: 'users',
		description: ''
	})
	public readonly users?: number[]

	@ArrayIdsQueryDecorator({
		field: 'clubs',
		description: ''
	})
	public readonly clubs?: number[]

	@PriceQueryDecorator({ description: '', field: 'price' })
	public readonly price?: number | number[]
}
