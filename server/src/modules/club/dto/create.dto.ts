import { ClubDtoSwagger } from '../swagger/dto'

export class CreateClubDto {
	@ClubDtoSwagger.name_()
	name: string

	@ClubDtoSwagger.address()
	address: string

	@ClubDtoSwagger.admins()
	admins: number[]
}
