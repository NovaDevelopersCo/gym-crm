import { GroupDecoratorsSwagger } from '../swagger'

export class CreateGroupDto {
	@GroupDecoratorsSwagger.name_(true)
	name: string

	@GroupDecoratorsSwagger.direction(true)
	direction: number

	@GroupDecoratorsSwagger.club(true)
	club: number
}
