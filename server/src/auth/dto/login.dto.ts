import { CommonDecoratorsSwagger } from '@/core/swagger'

export class LoginDto {
	@CommonDecoratorsSwagger.email(true)
	email: string

	@CommonDecoratorsSwagger.password(true)
	password: string
}
