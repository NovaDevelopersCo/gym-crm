import { FullQueryDto } from '@/core/dto'
import { QuerySearch } from '@/core/decorators'

enum ESearch {
	FIO = 'fio',
	EMAIL = 'email'
}

enum ESort {
	FIO = 'fio',
	EMAIL = 'email'
}

export class FindAllStaffDto extends FullQueryDto {
	@QuerySearch(ESort, 'Сортировка по', "Параметр 'Сортировка по' невалиден")
	sortBy: ESort = ESort.FIO

	@QuerySearch<ESearch>(ESearch, 'Поиск по', "Параметр 'Поиск по' невалиден", {
		fio: {
			minLength: 2,
			maxLength: 100
		},
		email: {
			minLength: 2,
			maxLength: 200
		}
	})
	searchBy: ESort = ESort.FIO
}
