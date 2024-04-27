import { FullQueryDto } from '@/core/dto'
import { QuerySearch } from '@/core/decorators'

enum ESort {
	NAME = 'name',
	ADDRESS = 'address'
}

enum ESearch {
	NAME = 'name',
	ADDRESS = 'address'
}

export class FindAllClubDto extends FullQueryDto {
	@QuerySearch<ESort>(ESort, 'Сортировка по', "Параметр 'Сортировка по' невалиден")
	sortBy: ESort = ESort.NAME

	@QuerySearch<ESearch>(ESearch, 'Поиск по', "Параметр 'Поиск по' невалиден", {
		name: {
			maxLength: 100
		},
		address: {
			maxLength: 100
		}
	})
	searchBy: ESearch = ESearch.NAME
}
