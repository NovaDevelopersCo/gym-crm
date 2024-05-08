import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsInt, IsOptional, Min } from 'class-validator'

export class PaginationDto {
	@ApiProperty({
		required: false,
		default: 1,
		description: 'Номер страницы'
	})
	@IsOptional()
	@Type(() => Number)
	@IsInt({ message: 'Параметр номер страницы должен быть числом' })
	@Min(1, { message: 'Параметр номер страницы должен быть больше 0' })
	public readonly page: number = 1

	@ApiProperty({
		required: false,
		default: 10,
		description: 'Количество элементов на странице'
	})
	@IsOptional()
	@Type(() => Number)
	@IsInt({ message: 'Параметр количество элементов должен быть числом' })
	@Min(1, { message: 'Параметр количество элементов должен быть больше 0' })
	public readonly count: number = 10
}
