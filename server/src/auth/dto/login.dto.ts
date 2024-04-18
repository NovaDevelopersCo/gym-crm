import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator'

export class LoginDto {
	@ApiProperty({
		example: 'email@email.com'
	})
	@IsEmail({}, { message: 'Невалидная почта' })
	email: string

	@ApiProperty({
		minLength: 8,
		maxLength: 32,
		example: 'password'
	})
	@IsString({ message: 'Пароль должен быть строкой' })
	@MinLength(8, { message: 'Минимальная длина пароля 8 символов' })
	@MaxLength(32, { message: 'Максимальная длина паролья 32 символа' })
	password: string
}
