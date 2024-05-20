import { FullQueryDto } from '@/core/dto'
import { QuerySearch } from '@/core/decorators'
import { productValidation } from '../validation'
import { ArrayIdsQueryDecorator, StringQueryDecorator } from '@/core/query'
import { PriceQueryDecorator } from '@/core/query'

enum ESort {
	NAME = 'name',
	PRICE = 'price',
	CREATE_DATE = 'createDate'
}

export class FindAllProductDto extends FullQueryDto {
	@QuerySearch(ESort, 'Сортировка по', "Параметр 'Сортировка по' невалиден")
	public readonly sortBy: ESort = ESort.CREATE_DATE

	@StringQueryDecorator({
		maxLength: productValidation.name.maxLength,
		description: 'Название товара или услуги',
		field: 'name',
		example: 'Шлем'
	})
	public readonly name?: string

	@ArrayIdsQueryDecorator({
		field: 'users',
		description: 'Массив id пользователя'
	})
	public readonly users?: number[]

	@ArrayIdsQueryDecorator({
		field: 'clubs',
		description: 'Массив id клубов'
	})
	public readonly clubs?: number[]

	@PriceQueryDecorator({
		description: 'Интервал цены или конкретная цена продукта',
		field: 'price'
	})
	public readonly price?: number | number[]
}
