import { FullQueryDto } from '@/core/dto'
import { QuerySearch } from '@/core/decorators'

enum ESort {
	FIO = 'fio',
	PHONE = 'phone',
	ADDRESS = 'address',
	EMAIL = 'email',
	CARD_NUMBER = 'cardNumber',
	BIRTHDAY = 'birthday'
}
enum ESearch {
	FIO = 'fio',
	PHONE = 'phone',
	ADDRESS = 'address',
	EMAIL = 'email',
	CARD_NUMBER = 'cardNumber',
	BIRTHDAY = 'birthday',
	EXPERIENCE_BEFORE = 'experienceBefore',
	HOW_KNOW = 'howKnow'
}

export class FindAllUserDto extends FullQueryDto {
	@QuerySearch(ESort, 'Сортировка по', "Параметр 'Сортировка по' невалиден")
	sortBy: ESort = ESort.FIO

	@QuerySearch(ESearch, 'Поиск по', "Параметр 'Поиск по' невалиден")
	searchBy: ESort = ESort.FIO
}
