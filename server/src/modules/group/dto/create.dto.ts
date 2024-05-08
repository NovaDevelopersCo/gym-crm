import { CommonDtoSwagger } from '@/core/swagger'
import { GroupDtoSwagger } from '../swagger'

export class CreateGroupDto {
	@GroupDtoSwagger.name_()
	public readonly name: string

	@GroupDtoSwagger.directionId()
	public readonly direction: number

	@CommonDtoSwagger.clubId()
	public readonly club: number
}
