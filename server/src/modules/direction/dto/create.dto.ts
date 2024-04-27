import { DirectionDecoratorsSwagger } from '../swagger/decorators'

export class CreateDirectionDto {
	@DirectionDecoratorsSwagger.name_(true)
	name: string
}
