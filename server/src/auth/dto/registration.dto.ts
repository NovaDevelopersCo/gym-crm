import { IsString, MaxLength, MinLength } from 'class-validator'

export class RegistrationDto {
	@IsString()
	email: string

	@IsString()
	@MinLength(8)
	@MaxLength(16)
	password: string

	@IsString()
	name: string
}
