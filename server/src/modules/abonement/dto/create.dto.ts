import { AbonementDtoSwagger } from '../swagger'

export class CreateAbonementDto {
	@AbonementDtoSwagger.price()
	price: number

	@AbonementDtoSwagger.name_()
	name: string

	@AbonementDtoSwagger.count()
	count?: number

	@AbonementDtoSwagger.duration()
	duration?: string

	@AbonementDtoSwagger.clubs()
	clubs: number[]
}
