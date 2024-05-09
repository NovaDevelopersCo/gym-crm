import { CommonPropertiesSwagger } from '@/core/swagger'
import { GroupPropertiesSwagger } from '../swagger'

export class CreateGroupDto {
	@GroupPropertiesSwagger.name_()
	public readonly name: string

	@GroupPropertiesSwagger.directionId()
	public readonly direction: number

	@CommonPropertiesSwagger.clubId()
	public readonly club: number
}
