import { CommonDecoratorsSwagger } from '@/core/swagger'
import { GroupDecoratorsSwagger } from '../swagger'

export class CreateGroupDto {
	@GroupDecoratorsSwagger.name_(true)
	name: string

	@GroupDecoratorsSwagger.direction(true)
	direction: number

	@CommonDecoratorsSwagger.club(true)
	club: number
}
