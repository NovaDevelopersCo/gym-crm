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
	public readonly sortBy: ESort = ESort.CREATE_DATE

	@StringQueryDecorator({
		field: 'name',
		maxLength: clubValidation.name.maxLength,
		description: 'Название клуба',
		example: 'Mack Club'
	})
	public readonly name?: string

	@StringQueryDecorator({
		field: 'address',
		maxLength: clubValidation.address.maxLength,
		description: 'Адрес',
		example: 'г. Москва ул. Шишкина д. 45'
	})
	public readonly address?: string

	@ArrayIdsQueryDecorator({
		field: 'admins',
		description: 'Массив id админов'
	})
	public readonly admins?: number[]
}
