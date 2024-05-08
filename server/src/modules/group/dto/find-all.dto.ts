import { QuerySearch } from '@/core/decorators'
import { groupValidation } from '../validation'
import { ArrayIdsQueryDecorator, StringQueryDecorator } from '@/core/query'
import { FullQueryDto } from '@/core/dto'

enum ESort {
	NAME = 'name',
	CREATE_DATE = 'createDate'
}

export class FindAllGroupDto extends FullQueryDto {
	@QuerySearch(ESort, 'Сортировка по', "Параметр 'Сортировка по' невалиден")
	sortBy: ESort = ESort.CREATE_DATE

	@StringQueryDecorator({
		field: 'name',
		description: '',
		maxLength: groupValidation.name.maxLength
	})
	name?: string

	@ArrayIdsQueryDecorator({
		description: '',
		field: 'clubs'
	})
	clubs: number[]

	@ArrayIdsQueryDecorator({
		description: '',
		field: 'directions'
	})
	directions: number[]
}
