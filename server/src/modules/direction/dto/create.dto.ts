import { DirectionPropertiesSwagger } from '../swagger/properties'

export class CreateDirectionDto {
	@DirectionPropertiesSwagger.name_(true)
	name: string
}
