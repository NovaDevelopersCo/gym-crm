import { DirectionPropertiesSwagger } from '../swagger'

export class CreateDirectionDto {
	@DirectionPropertiesSwagger.name_(true)
	public readonly name: string
}
