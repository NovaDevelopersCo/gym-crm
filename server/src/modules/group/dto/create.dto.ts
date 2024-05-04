import { PropertyDecoratorsSwagger } from '@/core/swagger'
import { GroupPropertiesSwagger } from '../swagger'

export class CreateGroupDto {
	@GroupPropertiesSwagger.name_(true)
	name: string

	@GroupPropertiesSwagger.directionId(true)
	direction: number

	@PropertyDecoratorsSwagger.clubId(true)
	club: number
}
