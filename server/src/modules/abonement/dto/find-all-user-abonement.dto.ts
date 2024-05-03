import { QuerySearch } from '@/core/decorators'
import { FullQueryDto } from '@/core/dto'

export enum ESearch {
	IS_FINISH = 'isFinish',
	COUNT = 'count',
	USER = 'user',
	ABONEMENT = 'abonement'
}

enum ESort {
	CREATE_DATE = 'createDate'
}

export class FindAllUserAbonementDto extends FullQueryDto {
	@QuerySearch(ESort, 'Сортировка по', "Параметр 'Сортировка по' невалиден")
	sortBy: ESort = ESort.CREATE_DATE

	@QuerySearch<ESearch>(ESearch, 'Поиск по', "Параметр 'Поиск по' невалиден", {
		count: {
			minLength: 1,
			maxLength: 3
		},
		isFinish: {
			minLength: 4,
			maxLength: 5
		},
		// ! пофиксить в рефакторинге
		user: {},
		abonement: {}
	})
	searchBy: ESearch = ESearch.IS_FINISH
}
