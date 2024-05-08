import { AbonementDtoSwagger } from '../swagger'

export class CreateAbonementDto {
	@AbonementDtoSwagger.price()
	public readonly price: number

	@AbonementDtoSwagger.name_()
	public readonly name: string

	@AbonementDtoSwagger.count()
	public readonly count?: number

	@AbonementDtoSwagger.duration()
	public readonly duration?: string

	@AbonementDtoSwagger.clubs()
	public readonly clubs: number[]
}
