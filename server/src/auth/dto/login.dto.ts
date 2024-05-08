import { CommonDtoSwagger } from '@/core/swagger'

export class LoginDto {
	@CommonDtoSwagger.email()
	public email: string

	@CommonDtoSwagger.password()
	public password: string
}
