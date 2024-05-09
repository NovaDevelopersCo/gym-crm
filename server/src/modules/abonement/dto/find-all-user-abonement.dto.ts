import { QuerySearch } from '@/core/decorators'
import { FullQueryDto } from '@/core/dto'
import { ArrayIdsQueryDecorator } from '@/core/query'
import { PriceQueryDecorator } from '@/core/query'
import { IsBooleanString, IsOptional } from 'class-validator'

enum ESort {
	CREATE_DATE = 'createDate',
	PRICE = 'price'
}

// TODO: сделать более сложную фильтрацию
export class FindAllUserAbonementDto extends FullQueryDto {
	@QuerySearch(ESort, 'Сортировка по', "Параметр 'Сортировка по' невалиден")
	public readonly sortBy: ESort = ESort.CREATE_DATE

	@PriceQueryDecorator({ description: '', field: 'count' })
	public readonly price?: number | number[]

	// TODO: придумать
	@IsOptional()
	@IsBooleanString()
	public readonly isFinish?: string

	@ArrayIdsQueryDecorator({
		field: 'users',
		description: ''
	})
	public readonly users?: number[]

	@ArrayIdsQueryDecorator({
		field: 'abomenents',
		description: ''
	})
	public readonly abomenents?: number[]
}
