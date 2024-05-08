import { FullQueryDto } from '@/core/dto'
import { QuerySearch } from '@/core/decorators'
import { ETypeSearch } from '@/core/types'
import { productValidation } from '../validation'

export enum ESearch {
	NAME = 'name',
	PRICE = 'price',
	CLUB = 'club'
}

enum ESort {
	NAME = 'name',
	PRICE = 'price'
}

export class FindAllProductDto extends FullQueryDto {
	@QuerySearch(ESort, 'Сортировка по', "Параметр 'Сортировка по' невалиден")
	public readonly sortBy: ESort = ESort.NAME

	@QuerySearch(ESearch, 'Поиск по', "Параметр 'Поиск по' невалиден", {
		name: {
			maxLength: productValidation.name.maxLength
		},
		price: {
			type: ETypeSearch.NUMBER,
			max: productValidation.price.max,
			min: productValidation.price.min
		},
		club: {}
	})
	public readonly searchBy: ESearch = ESearch.NAME
}
