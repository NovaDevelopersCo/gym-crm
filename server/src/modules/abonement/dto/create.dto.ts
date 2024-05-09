import { AbonementPropertiesSwagger } from '../swagger'

export class CreateAbonementDto {
	@AbonementPropertiesSwagger.price()
	public readonly price: number

	@AbonementPropertiesSwagger.name_()
	public readonly name: string

	@AbonementPropertiesSwagger.count()
	public readonly count?: number

	@AbonementPropertiesSwagger.duration()
	public readonly duration?: string

	@AbonementPropertiesSwagger.clubs()
	public readonly clubs: number[]
}
