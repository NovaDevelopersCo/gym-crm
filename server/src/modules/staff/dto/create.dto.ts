import { IsEnum, IsString, IsEmail, MinLength, MaxLength } from 'class-validator'

import { ECreateStaffRole } from '@/core/enums'
import { ApiProperty } from '@nestjs/swagger'

export class CreateDto {
	@ApiProperty({
		minLength: 2,
		maxLength: 30,
		default: 'name'
	})
	@IsString()
	@MaxLength(30)
	@MinLength(2)
	name: string

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
		default: 'admin / trainer / director'
	})
	@IsEnum(ECreateStaffRole)
	role: ECreateStaffRole
}
