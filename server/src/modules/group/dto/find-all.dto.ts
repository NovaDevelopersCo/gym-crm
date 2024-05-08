import { FullQueryDto } from '@/core/dto'
import { QuerySearch } from '@/core/decorators'
import { groupValidation } from '../validation'

enum ESearch {
	NAME = 'name'
}

enum ESort {
	NAME = 'name'
}

export class FindAllGroupDto extends FullQueryDto {
	@QuerySearch(ESort, 'Сортировка по', "Параметр 'Сортировка по' невалиден")
	public readonly sortBy: ESort = ESort.NAME

	@QuerySearch(ESearch, 'Поиск по', "Параметр 'Поиск по' невалиден", {
		name: {
			maxLength: groupValidation.name.maxLength
		}
	})
	public readonly searchBy: ESearch = ESearch.NAME
}
