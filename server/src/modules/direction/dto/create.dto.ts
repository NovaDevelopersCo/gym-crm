import { DirectionDtoSwagger } from '../swagger'

export class CreateDirectionDto {
	@DirectionDtoSwagger.name_()
	name: string
}
