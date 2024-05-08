import { DirectionDtoSwagger } from '../swagger'

export class CreateDirectionDto {
	@DirectionDtoSwagger.name_()
	public readonly name: string
}
