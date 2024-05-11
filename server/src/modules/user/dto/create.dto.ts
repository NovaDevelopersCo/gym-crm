import { CommonPropertiesSwagger } from '@/core/swagger'
import { UserPropertiesSwagger } from '../swagger/properties'

export class CreateUserDto {
	@CommonPropertiesSwagger.email(true)
	public readonly email: string

	@UserPropertiesSwagger.phone(true)
	public readonly phone: string

	@UserPropertiesSwagger.fio(true)
	public readonly fio: string

	@UserPropertiesSwagger.birthday(true)
	public readonly birthday?: string

	@UserPropertiesSwagger.howKnow(true)
	public readonly howKnow?: string

	@CommonPropertiesSwagger.clubId()
	public readonly club: number

	@UserPropertiesSwagger.groupIds()
	public readonly groups: number[]

	@UserPropertiesSwagger.instagram(true)
	public readonly instagram: string
}
