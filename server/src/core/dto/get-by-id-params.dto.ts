import { IsInt } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'

export class GetByIdParamsDto {
	@ApiProperty({
		description: 'Id сущности',
		default: '111'
	})
	@Type(() => Number)
	@IsInt({ message: 'Параметр id должен быть числом' })
	id: number
}
