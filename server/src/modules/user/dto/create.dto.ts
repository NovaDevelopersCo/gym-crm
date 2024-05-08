import { CommonDtoSwagger } from '@/core/swagger'
import { UserDtoSwagger } from '../swagger/dto'

export class CreateUserDto {
	@CommonDtoSwagger.email()
	public readonly email: string

	@UserDtoSwagger.phone()
	public readonly phone: string

	@UserDtoSwagger.fio()
	public readonly fio: string

	@UserDtoSwagger.birthday()
	public readonly birthday?: string

	@UserDtoSwagger.howKnow()
	public readonly howKnow?: string

	@CommonDtoSwagger.clubId()
	public readonly club: number

	@UserDtoSwagger.groups()
	public readonly groups: number[]

	@UserDtoSwagger.instagram()
	public readonly instagram: string
}
