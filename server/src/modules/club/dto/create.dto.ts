import { ClubPropertiesSwagger } from '../swagger/properties'

export class CreateClubDto {
	@ClubPropertiesSwagger.name_()
	public readonly name: string

	@ClubPropertiesSwagger.address()
	public readonly address: string

	@ClubPropertiesSwagger.admins()
	public readonly admins: number[]
}
