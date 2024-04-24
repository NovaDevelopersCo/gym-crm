import { IsEnum, IsString, IsEmail, MinLength, MaxLength } from 'class-validator'
import { EStaffRole, ECreateStaffRole } from '@/core/enums'
import { ApiProperty } from '@nestjs/swagger'

export class CreateStaffDto {
	@ApiProperty({
		minLength: 8,
		maxLength: 32,
		example: 'password'
	})
	@IsString({ message: 'Пароль должен быть строкой' })
	@MinLength(8, { message: 'Минимальная длина пароля 8 символов' })
	@MaxLength(32, { message: 'Максимальная длина пароля 32 символа' })
	password: string

	@ApiProperty({
		example: 'email@email.com'
	})
	@IsEmail({}, { message: 'Невалидная почта' })
	email: string

	@ApiProperty({
		enum: ECreateStaffRole,
		example: 'admin'
	})
	@IsEnum(EStaffRole, { message: 'Невалидная роль' })
	role: EStaffRole
}
