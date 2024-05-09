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
		description: ''
	})
	public readonly name?: string

	// ! Мейби заменить на массив
	@StringQueryDecorator({
		description: '',
		field: 'duration',
		maxLength: 5
	})
	public readonly duration: string

	@PriceQueryDecorator({ description: '', field: 'count' })
	public readonly price?: number | number[]

	@ArrayIdsQueryDecorator({
		field: 'clubs',
		description: ''
	})
	public readonly clubs?: number[]
}
