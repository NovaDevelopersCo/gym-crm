import { CommonDtoSwagger } from '@/core/swagger'
import { UserDtoSwagger } from '../swagger/dto'

export class CreateUserDto {
	@CommonDtoSwagger.email()
	email: string

	@UserDtoSwagger.phone()
	phone: string

	@UserDtoSwagger.fio()
	fio: string

	@UserDtoSwagger.birthday()
	birthday?: string

	@UserDtoSwagger.howKnow()
	howKnow?: string

	@CommonDtoSwagger.clubId()
	club: number

	@CommonDtoSwagger.groupIds()
	groups: number[]

	@UserDtoSwagger.instagram()
	instagram: string
}
