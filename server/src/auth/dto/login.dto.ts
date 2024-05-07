import { CommonDtoSwagger } from '@/core/swagger'

export class LoginDto {
	@CommonDtoSwagger.email()
	email: string

	@CommonDtoSwagger.password()
	password: string
}
