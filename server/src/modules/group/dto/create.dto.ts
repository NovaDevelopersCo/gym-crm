import { CommonDtoSwagger } from '@/core/swagger'
import { GroupDtoSwagger } from '../swagger'

export class CreateGroupDto {
	@GroupDtoSwagger.name_()
	name: string

	@GroupDtoSwagger.directionId()
	direction: number

	@CommonDtoSwagger.clubId()
	club: number
}
