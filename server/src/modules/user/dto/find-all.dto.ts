import { userValidation } from '../validation'
import { IsInt, IsOptional, MaxLength } from 'class-validator'
import { Type } from 'class-transformer'
import { ArrayIdsQueryDecorator, StringQueryDecorator } from '@/core/query'
import { QuerySearch } from '@/core/decorators'
import { FullQueryDto } from '@/core/dto'

// TODO: дополнить
enum ESort {
	FIO = 'fio',
	CREATE_DATE = 'createDate'
}

export class FindAllUserDto extends FullQueryDto {
	@QuerySearch(ESort, 'Сортировка по', "Параметр 'Сортировка по' невалиден")
	public readonly sortBy: ESort = ESort.CREATE_DATE

	@StringQueryDecorator({
		field: 'fio',
		maxLength: userValidation.fio.maxLength,
		description: ''
	})
	public readonly fio?: string

	@StringQueryDecorator({
		field: 'email',
		maxLength: userValidation.fio.maxLength,
		description: ''
	})
	public readonly email?: string

	@StringQueryDecorator({
		field: 'instagram',
		maxLength: userValidation.fio.maxLength,
		description: ''
	})
	public readonly instagram?: string

	// TODO: ?
	@IsOptional()
	@IsInt()
	@Type(() => Number)
	@MaxLength(userValidation.phone.maxLength)
	public readonly phone?: number

	@StringQueryDecorator({
		field: 'howKnow',
		maxLength: userValidation.howKnow.maxLength,
		description: ''
	})
	public readonly howKnow?: string

	@ArrayIdsQueryDecorator({
		field: 'groups',
		description: ''
	})
	public readonly groups?: number[]

	@ArrayIdsQueryDecorator({
		field: 'clubs',
		description: ''
	})
	public readonly clubs?: number[]

	// TODO future:
	// TODO status: Enum
	// TODO countDateVisit: Количество дней с посещения
}
