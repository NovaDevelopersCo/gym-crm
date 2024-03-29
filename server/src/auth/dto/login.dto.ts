import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator'

export class LoginDto {
	@ApiProperty({
		default: 'email@email.com'
	})
	@IsEmail()
	email: string

	@ApiProperty({
		minLength: 8,
		maxLength: 32,
		default: 'password'
	})
	@IsString()
	@MinLength(8)
	@MaxLength(32)
	password: string
}
