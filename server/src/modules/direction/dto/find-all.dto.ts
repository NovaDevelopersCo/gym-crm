import { FullQueryDto } from '@/core/dto'
import { QuerySearch } from '@/core/decorators'
import { directionValidation } from '../validation'
import { ArrayIdsQueryDecorator, StringQueryDecorator } from '@/core/query'

enum ESort {
	NAME = 'name',
	CREATE_DATE = 'createDate'
}

export class FindAllDirectionDto extends FullQueryDto {
	@QuerySearch(ESort, 'Сортировка по', "Параметр 'Сортировка по' невалиден")
	public readonly sortBy: ESort = ESort.CREATE_DATE

	@StringQueryDecorator({
		description: '',
		field: 'name',
		maxLength: directionValidation.name.maxLength
	})
	public readonly name?: string

	@ArrayIdsQueryDecorator({
		field: 'groups',
		description: ''
	})
	public readonly groups?: number[]
}
