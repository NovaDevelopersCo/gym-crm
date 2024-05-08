import { FullQueryDto } from '@/core/dto'
import { QuerySearch } from '@/core/decorators'
import { staffValidation } from '../validation'

enum ESearch {
	EMAIL = 'email'
}

enum ESort {
	EMAIL = 'email'
}

export class FindAllStaffDto extends FullQueryDto {
	@QuerySearch(ESort, 'Сортировка по', "Параметр 'Сортировка по' невалиден")
	public readonly sortBy: ESort = ESort.EMAIL

	@QuerySearch(ESearch, 'Поиск по', "Параметр 'Поиск по' невалиден", {
		email: {
			maxLength: staffValidation.email.maxLength
		}
	})
	public readonly searchBy: ESearch = ESearch.EMAIL
}
