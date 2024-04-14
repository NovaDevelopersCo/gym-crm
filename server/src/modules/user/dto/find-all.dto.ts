import { FullQueryDto } from '@/core/dto'
import { QuerySearch } from '@/core/decorators'

enum ESort {
	FIO = 'fio',
	CREATE_DATE = 'createDate'
}
enum ESearch {
	FIO = 'fio',
	PHONE = 'phone'
}

export class FindAllUserDto extends FullQueryDto {
	@QuerySearch(ESort, 'Сортировка по', "Параметр 'Сортировка по' невалиден")
	sortBy: ESort = ESort.FIO

	@QuerySearch<ESearch>(ESearch, 'Поиск по', "Параметр 'Поиск по' невалиден", {
		fio: {
			maxLength: 200
		},
		phone: {
			maxLength: 10
		}
	})
	searchBy: ESearch = ESearch.FIO
}
