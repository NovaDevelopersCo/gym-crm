import { FullQueryDto } from '@/core/dto'
import { QuerySearch } from '@/core/decorators'
import { userValidation } from '../validation'

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

	@QuerySearch(ESearch, 'Поиск по', "Параметр 'Поиск по' невалиден", {
		fio: {
			maxLength: userValidation.fio.maxLength
		},
		phone: {
			maxLength: userValidation.phone.maxLength
		}
	})
	searchBy: ESearch = ESearch.FIO
}
