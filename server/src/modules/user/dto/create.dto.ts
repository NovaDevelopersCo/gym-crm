import { ApiProperty } from '@nestjs/swagger'
import {
	IsCreditCard,
	IsDateString,
	IsEmail,
	IsInt,
	IsOptional,
	IsPhoneNumber,
	IsString
} from 'class-validator'

export class CreateUserDto {
	@ApiProperty({ default: 'email@gmail.com' })
	@IsEmail({}, { message: 'Невалидная почта' })
	email: string

	@ApiProperty({ default: '79003001122' })
	@IsPhoneNumber('RU', { message: 'Некорректный номер' })
	phone: string

	@ApiProperty({ default: 'Иванов Иван Иванович' })
	@IsString({ message: 'ФИО должно быть строкой' })
	fio: string

	// ! may be optional?
	@ApiProperty({ default: '5464665866903741', description: 'Номер карты' })
	@IsCreditCard({ message: 'Некорректный номер карты' })
	cardNumber: string

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
		default: [15, 65, 9]
	})
	@IsInt({ each: true, message: 'Id тренеров должны быть числом' })
	trainers: number[]
}
