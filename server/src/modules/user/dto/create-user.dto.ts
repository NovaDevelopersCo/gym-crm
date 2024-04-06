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
	@ApiProperty({ example: 'email@gmail.com' })
	@IsEmail({}, { message: 'Невалидная почта' })
	email: string

	@ApiProperty({ example: '79003001122' })
	@IsPhoneNumber('RU', { message: 'Некорректный номер' })
	phone: string

	@ApiProperty({ example: 'Иванов Иван Иванович' })
	@IsString({ message: 'ФИО должно быть строкой' })
	fio: string

	// ! may be optional?
	@ApiProperty({ example: '5464665866903741', description: 'Номер карты' })
	@IsCreditCard({ message: 'Некорректный номер карты' })
	cardNumber: string

	@ApiProperty({
		required: false,
		example: '2021-04-19',
		description: 'Дата рождения '
	})
	@IsOptional()
	@IsDateString({}, { message: 'День рождение должен быть ISO формата (yyyy-mm-dd)' })
	birthday?: string

	@ApiProperty({ required: false, description: 'Существующий опыт', example: 'Дзюдо, плаванье' })
	@IsOptional()
	@IsString({ message: 'experienceBefore должно быть строкой' })
	experienceBefore?: string

	@ApiProperty({
		required: false,
		description: 'Как узнали о клубе',
		example: 'Посоветовал друг, увидел в интернете'
	})
	@IsOptional()
	@IsString({ message: 'howKnow должно быть строкой' })
	howKnow?: string

	@ApiProperty({ description: 'Клуб в который пользователь хочет записаться', example: 2 })
	@IsInt({ message: 'Id клуба должен быть числом' })
	club: number

	@ApiProperty({
		description: 'Группы в которые пользователь хочет записаться',
		example: [3, 5, 6]
	})
	@IsInt({ each: true, message: 'Id групп должны быть числом' })
	groups: number[]
}
