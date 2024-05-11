import { abonementValidation } from './../validation/abonement.validation'
import { FullQueryDto } from '@/core/dto'
import { QuerySearch } from '@/core/decorators'
import { ArrayIdsQueryDecorator, StringQueryDecorator } from '@/core/query'
import { PriceQueryDecorator } from '@/core/query'

enum ESort {
	NAME = 'name',
	PRICE = 'price',
	CREATE_DATE = 'createDate'
}

// TODO:  Сделать макс мин price
// TODO: Сделать больше
export class FindAllAbonementDto extends FullQueryDto {
	@QuerySearch(ESort, 'Сортировка по', "Параметр 'Сортировка по' невалиден")
	public readonly sortBy: ESort = ESort.CREATE_DATE

	@StringQueryDecorator({
		field: 'name',
		maxLength: abonementValidation.name.maxLength,
		description: 'Название абонемента'
	})
	public readonly name?: string

	@StringQueryDecorator({
		description: 'Длительность абонемента',
		example: '1m.',
		field: 'duration',
		maxLength: abonementValidation.duration.maxLength
	})
	public readonly duration: string

	@PriceQueryDecorator({ description: '', field: 'count' })
	public readonly price?: number | number[]

	@ArrayIdsQueryDecorator({
		field: 'clubs',
		description: 'Массив id клубов'
	})
	public readonly clubs?: number[]
}
