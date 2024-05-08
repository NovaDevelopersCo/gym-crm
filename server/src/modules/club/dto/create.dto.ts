import { ClubDtoSwagger } from '../swagger/dto'

export class CreateClubDto {
	@ClubDtoSwagger.name_()
	public readonly name: string

	@ClubDtoSwagger.address()
	public readonly address: string

	@ClubDtoSwagger.admins()
	public readonly admins: number[]
}
