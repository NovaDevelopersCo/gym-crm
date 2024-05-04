import { PropertyDecoratorsSwagger } from '@/core/swagger'
import { AbonementPropertiesSwagger } from '../swagger'

export class CreateAbonementDto {
	@AbonementPropertiesSwagger.price(true)
	price: number

	@AbonementPropertiesSwagger.name_(true)
	name: string

	@AbonementPropertiesSwagger.count(true)
	count?: number

	@AbonementPropertiesSwagger.duration(true)
	duration?: string

	@PropertyDecoratorsSwagger.clubIds(true)
	clubs: number[]
}