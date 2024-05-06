import { PropertyDecoratorsSwagger } from '@/core/swagger'

export class LoginDto {
	@PropertyDecoratorsSwagger.email(true)
	email: string

	@PropertyDecoratorsSwagger.password(true)
	password: string
}
