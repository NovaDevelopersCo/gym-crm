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
	public readonly sortBy: ESort = ESort.CREATE_DATE

	@StringQueryDecorator({
		field: 'name',
		description: 'Название группы',
		maxLength: groupValidation.name.maxLength
	})
	public readonly name?: string

	@ArrayIdsQueryDecorator({
		description: 'Массив id клубов',
		field: 'clubs'
	})
	public readonly clubs: number[]

	@ArrayIdsQueryDecorator({
		description: 'Массив id направлений',
		field: 'directions'
	})
	public readonly directions: number[]
}
