import { Matches } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class GetByIdParamsDto {
	@ApiProperty({
		description: 'Id должно быть числом',
		default: '111'
	})
	@Matches(/^\d+$/, { message: 'Id направления должно быть числом' })
	id: string
}
