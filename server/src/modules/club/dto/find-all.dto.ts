import { clubValidation } from '../validation'
import { ArrayIdsQueryDecorator, StringQueryDecorator } from '@/core/query'
import { FullQueryDto } from '@/core/dto'
import { QuerySearch } from '@/core/decorators'

enum ESort {
	NAME = 'name',
	ADDRESS = 'address',
	CREATE_DATE = 'createDate'
}

export class FindAllClubDto extends FullQueryDto {
	@QuerySearch(ESort, 'Сортировка по', "Параметр 'Сортировка по' невалиден")
	sortBy: ESort = ESort.CREATE_DATE

	@StringQueryDecorator({
		field: 'name',
		maxLength: clubValidation.name.maxLength,
		description: ''
	})
	name?: string

	@StringQueryDecorator({
		field: 'address',
		maxLength: clubValidation.address.maxLength,
		description: ''
	})
	address?: string

	@ArrayIdsQueryDecorator({
		field: 'admins',
		description: ''
	})
	admins?: number[]
}
