import { FullQueryDto } from '@/core/dto'
import { QuerySearch } from '@/core/decorators'
import { staffValidation } from '../validation'
import { EStaffRole } from '@/core/enums'
import { StringQueryDecorator } from '@/core/query'
import { StaffPropertiesSwagger } from '../swagger'

enum ESort {
	EMAIL = 'email',
	CREATE_DATE = 'createDate'
}

export class FindAllStaffDto extends FullQueryDto {
	@QuerySearch(ESort, 'Сортировка по', "Параметр 'Сортировка по' невалиден")
	public readonly sortBy: ESort = ESort.CREATE_DATE

	@StringQueryDecorator({
		maxLength: staffValidation.email.maxLength,
		description: 'Почтовый адрес',
		example: 'email@gmail.com',
		field: 'email'
	})
	public readonly email?: string

	@StaffPropertiesSwagger.queryRole()
	public readonly role?: EStaffRole
}
