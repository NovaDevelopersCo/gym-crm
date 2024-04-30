import { PropertyDecoratorsSwagger } from '@/core/swagger'
import { UserPropertiesSwagger } from '../swagger/properties'

export class CreateUserDto {
	@PropertyDecoratorsSwagger.email(true)
	email: string

	@UserPropertiesSwagger.phone(true)
	phone: string

	@UserPropertiesSwagger.fio(true)
	fio: string

	@UserPropertiesSwagger.birthday(true)
	birthday?: string

	@UserPropertiesSwagger.howKnow(true)
	howKnow?: string

	@PropertyDecoratorsSwagger.clubId(true)
	club: number

	@PropertyDecoratorsSwagger.groupIds(true)
	groups: number[]

	@UserPropertiesSwagger.instagram(true)
	instagram: string
}
