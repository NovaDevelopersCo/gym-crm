import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsString, MaxLength, MinLength } from 'class-validator'

export class CreateClubDto {
	@ApiProperty({
		default: 'Mass Club'
	})
	@IsString({ message: 'Название клуба должно быть строкой' })
	@MinLength(2, { message: 'Минимальная длина названия клуба 2 символа' })
	@MaxLength(100, { message: 'Максимальная длина названия клуба 100 символов' })
	name: string

	@ApiProperty({
		default: 'г. Москва ул. Шишкина д. 45'
	})
	@IsString({ message: 'Адрес клуба должен быть строкой' })
	@MinLength(2, { message: 'Минимальная длина названия клуба должна быть 2 символа' })
	@MaxLength(100, { message: 'Максимальная длина названия клуба должна быть 100 символов' })
	address: string

	@ApiProperty({
		default: 111
	})
	@IsNumber({}, { message: 'Id админа должно быть числом' })
	admin: number
}
