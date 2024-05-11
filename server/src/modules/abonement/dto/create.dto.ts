import { AbonementPropertiesSwagger } from '../swagger'

export class CreateAbonementDto {
	@AbonementPropertiesSwagger.price(true)
	public readonly price: number

	@AbonementPropertiesSwagger.name_(true)
	public readonly name: string

	@AbonementPropertiesSwagger.count(true)
	public readonly count?: number

	@AbonementPropertiesSwagger.duration(true)
	public readonly duration?: string

	@AbonementPropertiesSwagger.clubIds(true)
	public readonly clubs: number[]
}
