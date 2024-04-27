import { ClubDecoratorsSwagger } from '../swagger/decorators'

export class CreateClubDto {
	@ClubDecoratorsSwagger.name_(true)
	name: string

	@ClubDecoratorsSwagger.address(true)
	address: string

	@ClubDecoratorsSwagger.adminIds(true)
	admins: number[]
}
