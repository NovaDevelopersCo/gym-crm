import { FullQueryDto } from '@/core/dto'
import { QuerySearch } from '@/core/decorators'
import { directionValidation } from '../validation'

enum ESearch {
	NAME = 'name'
}

enum ESort {
	NAME = 'name'
}

export class FindAllDirectionDto extends FullQueryDto {
	@QuerySearch(ESort, 'Сортировка по', "Параметр 'Сортировка по' невалиден")
	sortBy: ESort = ESort.NAME

	@QuerySearch(ESearch, 'Поиск по', "Параметр 'Поиск по' невалиден", {
		name: {
			maxLength: directionValidation.name.maxLength
		}
	})
	searchBy: ESearch = ESearch.NAME
}
