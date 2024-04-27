import { CommonDecoratorsSwagger } from '@/core/swagger'
import { GroupDecoratorsSwagger } from '../swagger'

export class CreateGroupDto {
	@GroupDecoratorsSwagger.name_(true)
	name: string

	@GroupDecoratorsSwagger.directionId(true)
	direction: number

	@CommonDecoratorsSwagger.clubId(true)
	club: number
}
