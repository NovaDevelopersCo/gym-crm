import { ClubPropertiesSwagger } from '../swagger/properties'

export class CreateClubDto {
	@ClubPropertiesSwagger.name_(true)
	public readonly name: string

	@ClubPropertiesSwagger.address(true)
	public readonly address: string

	@ClubPropertiesSwagger.adminIds()
	public readonly admins: number[]
}
