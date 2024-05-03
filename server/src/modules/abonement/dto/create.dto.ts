import { AbonementPropertiesSwagger } from '../swagger'

// ! add clubs
export class CreateAbonementDto {
	@AbonementPropertiesSwagger.price(true)
	price: number

	@AbonementPropertiesSwagger.name_(true)
	name: string

	@AbonementPropertiesSwagger.count(true)
	count?: number

	@AbonementPropertiesSwagger.duration(true)
	duration?: string
}
