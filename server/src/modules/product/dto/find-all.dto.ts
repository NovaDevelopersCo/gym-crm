import { FullQueryDto } from '@/core/dto'
import { QuerySearch } from '@/core/decorators'

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
	sortBy: ESort = ESort.NAME

	@QuerySearch<ESearch>(ESearch, 'Поиск по', "Параметр 'Поиск по' невалиден", {
		name: {
			maxLength: 100
		},
		price: {},
		club: {}
	})
	searchBy: ESearch = ESearch.NAME
}