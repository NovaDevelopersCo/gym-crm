import { userValidation } from '../validation'
import { ArrayIdsQueryDecorator, StringQueryDecorator } from '@/core/query'
import { QuerySearch } from '@/core/decorators'
import { FullQueryDto } from '@/core/dto'
import { UserPropertiesSwagger } from '../swagger'

// TODO: дополнить
enum ESort {
	FIO = 'fio',
	CREATE_DATE = 'createDate',
	PHONE = 'phone',
	INSTAGRAM = 'instagram',
	HOW_KNOW = 'howKnow'
}

export class FindAllUserDto extends FullQueryDto {
	@QuerySearch(ESort, 'Сортировка по', "Параметр 'Сортировка по' невалиден")
	public readonly sortBy: ESort = ESort.CREATE_DATE

	@StringQueryDecorator({
		field: 'fio',
		maxLength: userValidation.fio.maxLength,
		description: 'ФИО пользователя',
		example: 'Иванов Иван Иванович'
	})
	public readonly fio?: string

	@StringQueryDecorator({
		field: 'email',
		maxLength: userValidation.fio.maxLength,
		description: 'Email пользователя',
		example: 'randomenail@gmail.com'
	})
	public readonly email?: string

	@StringQueryDecorator({
		field: 'instagram',
		maxLength: userValidation.fio.maxLength,
		description: 'Инстаграм пользователя',
		example: 'my_account'
	})
	public readonly instagram?: string

	@UserPropertiesSwagger.queryPhone()
	public readonly phone?: number

	@UserPropertiesSwagger.fromDateRegistration()
	public fromDateRegistration: string

	@UserPropertiesSwagger.fromBirthday()
	public fromBirthday: string

	@StringQueryDecorator({
		field: 'howKnow',
		maxLength: userValidation.howKnow.maxLength,
		description: 'Как вы узнали о нас?',
		example: 'посоветовал друг'
	})
	public readonly howKnow?: string

	@ArrayIdsQueryDecorator({
		field: 'groups',
		description: 'Массив id групп'
	})
	public readonly groups?: number[]

	@ArrayIdsQueryDecorator({
		field: 'clubs',
		description: 'Массив id клубов'
	})
	public readonly clubs?: number[]

	// TODO: Доделать когда будут посещения
	//* @ApiProperty({ example: 23, description: 'Количество дней с момента помещения' })
	//* @IsOptional()
	//* @IsInt()
	//* @Type(() => Number)
	//* public countDateVisit: number

	// TODO future:
	// TODO status: Enum
	// TODO countDateVisit: Количество дней с посещения
}
