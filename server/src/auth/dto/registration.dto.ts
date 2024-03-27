import { Role } from '@prisma/client'
import { IsEnum, IsString, MaxLength, MinLength } from 'class-validator'

export class RegistrationDto {
	@IsEnum(Role)
	role: Role

	@IsString()
	email: string

	@IsString()
	@MinLength(8)
	@MaxLength(16)
	password: string

	@IsString()
	name: string
}
