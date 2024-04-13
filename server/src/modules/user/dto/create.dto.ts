import { ApiProperty } from '@nestjs/swagger'
import {
	IsDateString,
	IsEmail,
	IsInt,
	IsOptional,
	IsPhoneNumber,
	IsString,
	MaxLength,
	MinLength
} from 'class-validator'

export class CreateUserDto {
	@ApiProperty({ default: 'email@gmail.com' })
	@IsEmail({}, { message: 'Невалидная почта' })
	@MaxLength(200, { message: 'Максимальная длина почты 200 символов' })
	email: string

	@ApiProperty({ default: '79003001122' })
	@IsPhoneNumber('RU', { message: 'Некорректный номер' })
	phone: string

	@ApiProperty({ default: 'Иванов Иван Иванович' })
	@MinLength(2, { message: 'Минимальная длина фио 3 символа' })
	@MaxLength(200, { message: 'Максимальная длина фио 200 символов' })
	@IsString({ message: 'ФИО должно быть строкой' })
	fio: string

	@ApiProperty({
		required: false,
		default: '2021-04-19'
	})
	@IsOptional()
	@IsDateString({}, { message: 'День рождение должен быть ISO формата (yyyy-mm-dd)' })
	birthday?: string

	@ApiProperty({
		required: false,
		default: 'Посоветовал друг, увидел в интернете'
	})
	@IsOptional()
	@IsString({ message: 'howKnow должно быть строкой' })
	@MaxLength(300, { message: 'Максимальная длина как узнали о нас 300 символов' })
	howKnow?: string

	@ApiProperty({ default: 2 })
	@IsInt({ message: 'Id клуба должен быть числом' })
	club: number

	@ApiProperty({
		default: [3, 5, 6]
	})
	@IsInt({ each: true, message: 'Id групп должны быть числом' })
	groups: number[]

	@ApiProperty({
		default: 'my_account'
	})
	@IsOptional()
	@IsString({ message: 'Аккаунт инстаграм должен быть строкой' })
	@MaxLength(50, { message: 'Максимальная длина аккаунта в инстаграм 50 символов' })
	instagram: string
}
