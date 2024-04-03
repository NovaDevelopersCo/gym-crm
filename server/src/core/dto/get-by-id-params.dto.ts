import { Matches } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class GetByIdParamsDto {
	@ApiProperty({
		description: 'Id сущности',
		default: '111'
	})
	@Matches(/^\d+$/, { message: 'Id должно быть числом' })
	id: string
}
