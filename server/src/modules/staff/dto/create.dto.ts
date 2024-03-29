import { IsEnum, IsString, IsEmail, MinLength, MaxLength } from 'class-validator'

import { EStaffRole } from '@/core/enums'

export class CreateDto {
	@IsString()
	@MaxLength(30)
	@MinLength(2)
	name: string

	@IsString()
	@MinLength(8)
	@MaxLength(32)
	password: string

	@IsEmail()
	email: string

	@IsEnum(EStaffRole)
	role: EStaffRole
}
