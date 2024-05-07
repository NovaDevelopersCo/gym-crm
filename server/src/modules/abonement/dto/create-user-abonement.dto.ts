import { AbonementDtoSwagger } from '../swagger'

export class CreateUserAbonementDto {
	@AbonementDtoSwagger.abonementId()
	abonementId: number

	@AbonementDtoSwagger.userId()
	userId: number
}
