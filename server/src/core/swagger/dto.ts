import { CommonPropertiesSwagger } from './properties'

export class IdDto {
	@CommonPropertiesSwagger.id()
	public readonly id: number
}
