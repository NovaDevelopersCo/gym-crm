import { FullQueryDto } from '@/core/dto'
import { QuerySearch } from '@/core/decorators'

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

	@QuerySearch<ESearch>(ESearch, 'Поиск по', "Параметр 'Поиск по' невалиден", {
		name: {
			maxLength: 50
		}
	})
	searchBy: ESort = ESort.NAME
}
