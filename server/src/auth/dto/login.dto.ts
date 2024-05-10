import { CommonPropertiesSwagger } from '@/core/swagger'

export class LoginDto {
	@CommonPropertiesSwagger.email(true)
	public email: string

	@CommonPropertiesSwagger.password(true)
	public password: string
}
