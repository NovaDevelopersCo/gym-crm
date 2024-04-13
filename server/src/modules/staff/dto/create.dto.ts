import { IsEnum, IsString, IsEmail, MinLength, MaxLength } from 'class-validator'

import { ECreateStaffRole, EStaffRole } from '@/core/enums'
import { ApiProperty } from '@nestjs/swagger'

export class CreateStaffDto {
	@ApiProperty({
		minLength: 2,
		maxLength: 100,
		default: 'Васильев Василий Васильевич'
	})
	@IsString({ message: 'Ф.И.О. должно быть строкой' })
	@MaxLength(100, { message: 'Максимальная длина Ф.И.О 100 символов' })
	@MinLength(2, { message: 'Минимальная длина Ф.И.О 5 символа' })
	fio: string

	@ApiProperty({
		minLength: 8,
		maxLength: 32,
		default: 'password'
	})
	@IsString({ message: 'Пароль должен быть строкой' })
	@MinLength(8, { message: 'Минимальная длина пароля 8 символов' })
	@MaxLength(32, { message: 'Максимальная длина пароля 32 символа' })
	password: string

	@ApiProperty({
		default: 'email@email.com'
	})
	@IsEmail({}, { message: 'Невалидная почта' })
	email: string

	@ApiProperty({
		enum: ECreateStaffRole,
		default: 'admin'
	})
	@IsEnum(EStaffRole, { message: 'Невалидная роль' })
	role: EStaffRole
}
