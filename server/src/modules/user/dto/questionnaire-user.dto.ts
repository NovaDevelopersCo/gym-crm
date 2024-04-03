import { ApiProperty } from '@nestjs/swagger'
import { IsDateString, IsEmail, IsInt, IsOptional, IsString } from 'class-validator'

export class QuestionnaireUserDto {
	@ApiProperty({ example: 'email@gmail.com' })
	@IsEmail()
	email: string

	@ApiProperty({ example: 79003001122 })
	@IsInt()
	phone: number

	@ApiProperty({ example: 'Иванов Иван Иванович' })
	@IsString()
	fio: string

	// ! may be optional?
	@ApiProperty({ example: 5464665866903741 })
	@IsInt()
	cardNumber: number

	@ApiProperty({
		required: false,
		example: '2021-04-19',
		description: 'Можно указать birthday или age '
	})
	@IsOptional()
	@IsDateString()
	birthday?: string

	@ApiProperty({
		required: false,
		example: 22,
		description: 'Можно указать birthday или age'
	})
	@IsOptional()
	@IsInt()
	age?: number

	@ApiProperty({ required: false })
	@IsOptional()
	@IsString()
	experienceBefore?: string

	@ApiProperty({ required: false, example: 'Посоветовал друг, увидел в интернете' })
	@IsOptional()
	@IsString()
	howKnow?: string

	@ApiProperty()
	@IsInt()
	clubId: number

	@ApiProperty({ description: 'Группы в которые пользователь хочет записаться' })
	@IsInt({ each: true })
	groupIds: number[]
}
