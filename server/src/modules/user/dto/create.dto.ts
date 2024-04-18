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
	@ApiProperty({ example: 'email@gmail.com', maxLength: 200 })
	@IsEmail({}, { message: 'Невалидная почта' })
	@MaxLength(200, { message: 'Максимальная длина почты 200 символов' })
	email: string

	@ApiProperty({ example: '79003001122' })
	@IsPhoneNumber('RU', { message: 'Некорректный номер' })
	phone: string

	@ApiProperty({ example: 'Иванов Иван Иванович', maxLength: 200, minLength: 2 })
	@MinLength(2, { message: 'Минимальная длина фио 3 символа' })
	@MaxLength(200, { message: 'Максимальная длина фио 200 символов' })
	@IsString({ message: 'ФИО должно быть строкой' })
	fio: string

	@ApiProperty({
		required: false,
		example: '2021-04-19'
	})
	@IsOptional()
	@IsDateString({}, { message: 'День рождение должен быть ISO формата (yyyy-mm-dd)' })
	birthday?: string

	@ApiProperty({
		required: false,
		example: 'Посоветовал друг, увидел в интернете',
		maxLength: 300
	})
	@IsOptional()
	@IsString({ message: 'howKnow должно быть строкой' })
	@MaxLength(300, { message: 'Максимальная длина как узнали о нас 300 символов' })
	howKnow?: string

	@ApiProperty({ example: 2 })
	@IsInt({ message: 'Id клуба должен быть числом' })
	club: number

	@ApiProperty({
		example: [3, 5, 6]
	})
	@IsInt({ each: true, message: 'Id групп должны быть числом' })
	groups: number[]

	@ApiProperty({
		example: 'my_account',
		required: false,
		maxLength: 50
	})
	@IsOptional()
	@IsString({ message: 'Аккаунт инстаграм должен быть строкой' })
	@MaxLength(50, { message: 'Максимальная длина аккаунта в инстаграм 50 символов' })
	instagram: string
}
