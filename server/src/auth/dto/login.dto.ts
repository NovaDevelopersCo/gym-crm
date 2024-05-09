import { CommonPropertiesSwagger } from '@/core/swagger'

export class LoginDto {
	@CommonPropertiesSwagger.email()
	public email: string

	@CommonPropertiesSwagger.password()
	public password: string
}
