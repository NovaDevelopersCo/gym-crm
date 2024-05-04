import { ClubPropertiesSwagger } from '../swagger/properties'

export class CreateClubDto {
	@ClubPropertiesSwagger.name_(true)
	name: string

	@ClubPropertiesSwagger.address(true)
	address: string

	@ClubPropertiesSwagger.adminIds(true)
	admins: number[]
}
