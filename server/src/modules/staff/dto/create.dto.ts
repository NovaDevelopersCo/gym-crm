import { IsEnum, IsString, IsEmail, MinLength, MaxLength } from 'class-validator'

import { ECreateStaffRole, EStaffRole } from '@/core/enums'
import { ApiProperty } from '@nestjs/swagger'

export class CreateDto {
	@ApiProperty({
		minLength: 2,
		maxLength: 100,
		default: 'Васильев Василий Васильевич'
	})
	@IsString()
	@MaxLength(100)
	@MinLength(2)
	fio: string

	@ApiProperty({
		minLength: 8,
		maxLength: 32,
		default: 'password'
	})
	@IsString()
	@MinLength(8)
	@MaxLength(32)
	password: string

	@ApiProperty({
		default: 'email@email.com'
	})
	@IsEmail()
	email: string

	@ApiProperty({
		enum: ECreateStaffRole,
		default: 'admin / trainer'
	})
	@IsEnum(EStaffRole)
	role: EStaffRole
}
