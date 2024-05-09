import { DirectionPropertiesSwagger } from '../swagger'

export class CreateDirectionDto {
	@DirectionPropertiesSwagger.name_()
	public readonly name: string
}
