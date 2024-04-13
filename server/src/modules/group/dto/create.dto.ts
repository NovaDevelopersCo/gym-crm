import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsString, MaxLength, MinLength } from 'class-validator'

export class CreateGroupDto {
	@ApiProperty({
		default: 'Группа 1'
	})
	@IsString({ message: 'Название группы должно быть строкой' })
	@MaxLength(100, { message: 'Максимальная длина названия группы 100 символов' })
	@MinLength(2, { message: 'Минимальная длина названия группы 2 символа' })
	name: string

	@ApiProperty({
		default: 3
	})
	@IsNumber({}, { message: 'Id направления должен быть числом ' })
	direction: number

	@ApiProperty({
		default: 5
	})
	@IsNumber({}, { message: 'Id клуба должен быть числом' })
	club: number
}
