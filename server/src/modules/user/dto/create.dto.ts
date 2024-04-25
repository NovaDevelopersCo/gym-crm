import { CommonDecoratorsSwagger } from '@/core/swagger'
import { UserDecoratorsSwagger } from '../swagger/decorators'

export class CreateUserDto {
	@CommonDecoratorsSwagger.email(true)
	email: string

	@UserDecoratorsSwagger.phone(true)
	phone: string

	@UserDecoratorsSwagger.fio(true)
	fio: string

	@UserDecoratorsSwagger.birthday(true)
	birthday?: string

	@UserDecoratorsSwagger.howKnow(true)
	howKnow?: string

	@CommonDecoratorsSwagger.club(true)
	club: number

	@CommonDecoratorsSwagger.groups(true)
	groups: number[]

	@UserDecoratorsSwagger.instagram(true)
	instagram: string
}
