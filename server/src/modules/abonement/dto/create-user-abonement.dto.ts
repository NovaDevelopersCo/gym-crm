import { AbonementDtoSwagger } from '../swagger'

export class CreateUserAbonementDto {
	@AbonementDtoSwagger.abonementId()
	public readonly abonementId: number

	@AbonementDtoSwagger.userId()
	public readonly userId: number
}
