import { ApiProperty } from '@nestjs/swagger'
import { ArrayMaxSize, IsNumber, IsString, MaxLength, MinLength } from 'class-validator'

export class CreateClubDto {
	@ApiProperty({
		example: 'Mass Club',
		minLength: 2,
		maxLength: 100
	})
	@IsString({ message: 'Название клуба должно быть строкой' })
	@MinLength(2, { message: 'Минимальная длина названия клуба 2 символа' })
	@MaxLength(100, { message: 'Максимальная длина названия клуба 100 символов' })
	name: string

	@ApiProperty({
		example: 'г. Москва ул. Шишкина д. 45',
		minLength: 2,
		maxLength: 100
	})
	@IsString({ message: 'Адрес клуба должен быть строкой' })
	@MinLength(2, { message: 'Минимальная длина названия клуба должна быть 2 символа' })
	@MaxLength(100, { message: 'Максимальная длина названия клуба должна быть 100 символов' })
	address: string

	@ApiProperty({
		example: [111, 222]
	})
	@ArrayMaxSize(2, { message: 'У клуба может быть не более двух админов' })
	@IsNumber({}, { message: 'Id админа должно быть числом', each: true })
	admins: number[]
}
