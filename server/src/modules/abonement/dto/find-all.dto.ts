import { FullQueryDto } from '@/core/dto'
import { QuerySearch } from '@/core/decorators'
import { ETypeSearch } from '@/core/types'

enum ESearch {
	NAME = 'name'
}

enum ESort {
	NAME = 'name',
	PRICE = 'price'
}

export class FindAllAbonementDto extends FullQueryDto {
	@QuerySearch(ESort, 'Сортировка по', "Параметр 'Сортировка по' невалиден")
	sortBy: ESort = ESort.NAME

	@QuerySearch(ESearch, 'Поиск по', "Параметр 'Поиск по' невалиден", {
		name: {
			type: ETypeSearch.BOOLEAN
		}
	})
	searchBy: ESearch = ESearch.NAME
}
