import { CommonPropertiesSwagger } from '@/core/swagger'
import { UserPropertiesSwagger } from '../swagger/properties'

export class CreateUserDto {
	@CommonPropertiesSwagger.email()
	public readonly email: string

	@UserPropertiesSwagger.phone()
	public readonly phone: string

	@UserPropertiesSwagger.fio()
	public readonly fio: string

	@UserPropertiesSwagger.birthday()
	public readonly birthday?: string

	@UserPropertiesSwagger.howKnow()
	public readonly howKnow?: string

	@CommonPropertiesSwagger.clubId()
	public readonly club: number

	@UserPropertiesSwagger.groups()
	public readonly groups: number[]

	@UserPropertiesSwagger.instagram()
	public readonly instagram: string
}
