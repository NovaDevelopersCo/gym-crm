import { QuerySearch } from '@/core/decorators'
import { FullQueryDto } from '@/core/dto'
import { ArrayIdsQueryDecorator } from '@/core/query'
import { PriceQueryDecorator } from '@/core/query'
import { AbonementPropertiesSwagger } from '../swagger'

enum ESort {
	CREATE_DATE = 'createDate',
	PRICE = 'price'
}

// TODO: сделать более сложную фильтрацию
export class FindAllUserAbonementDto extends FullQueryDto {
	@QuerySearch(ESort, 'Сортировка по', "Параметр 'Сортировка по' невалиден")
	public readonly sortBy: ESort = ESort.CREATE_DATE

	@PriceQueryDecorator({
		description: 'Интервал цены или конкретная цена абонемента пользователя',
		field: 'count'
	})
	public readonly price?: number | number[]

	@AbonementPropertiesSwagger.isFinishQuery()
	public readonly isFinish?: string

	@ArrayIdsQueryDecorator({
		field: 'users',
		description: 'Массив id пользователей'
	})
	public readonly users?: number[]

	@ArrayIdsQueryDecorator({
		field: 'abomenents',
		description: 'Массив id абонементов'
	})
	public readonly abomenents?: number[]
}
