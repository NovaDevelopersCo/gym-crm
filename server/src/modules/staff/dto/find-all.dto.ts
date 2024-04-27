import { FullQueryDto } from '@/core/dto'
import { QuerySearch } from '@/core/decorators'

enum ESearch {
	EMAIL = 'email'
}

enum ESort {
	EMAIL = 'email'
}

export class FindAllStaffDto extends FullQueryDto {
	@QuerySearch(ESort, 'Сортировка по', "Параметр 'Сортировка по' невалиден")
	sortBy: ESort = ESort.EMAIL

	@QuerySearch<ESearch>(ESearch, 'Поиск по', "Параметр 'Поиск по' невалиден", {
		email: {
			maxLength: 200
		}
	})
	searchBy: ESearch = ESearch.EMAIL
}
