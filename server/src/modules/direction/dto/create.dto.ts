import { IsString, MaxLength, MinLength } from 'class-validator'

import { ApiProperty } from '@nestjs/swagger'

export class CreateDirectionDto {
	@ApiProperty({ example: 'Кикбоксинг' })
	@IsString({ message: 'Направление должно быть строкой' })
	@MaxLength(50, { message: 'Максимальная длина направления 50 символов' })
	@MinLength(2, { message: 'Минимальная длина направления 2 символа' })
	name: string
}
