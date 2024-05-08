import { FullQueryDto } from '@/core/dto'
import { QuerySearch } from '@/core/decorators'
import { staffValidation } from '../validation'
import { IsEnum, IsOptional } from 'class-validator'
import { EStaffRole } from '@/core/enums'
import { StringQueryDecorator } from '@/core/query'

enum ESort {
	EMAIL = 'email',
	CREATE_DATE = 'createDate'
}

export class FindAllStaffDto extends FullQueryDto {
	@QuerySearch(ESort, 'Сортировка по', "Параметр 'Сортировка по' невалиден")
	sortBy: ESort = ESort.CREATE_DATE

	@StringQueryDecorator({
		maxLength: staffValidation.email.maxLength,
		description: '',
		field: 'email'
	})
	email?: string

	@IsOptional()
	@IsEnum(EStaffRole)
	role?: EStaffRole
}
