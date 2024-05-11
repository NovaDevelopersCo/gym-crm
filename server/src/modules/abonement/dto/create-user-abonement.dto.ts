import { AbonementPropertiesSwagger } from '../swagger'

export class CreateUserAbonementDto {
	@AbonementPropertiesSwagger.abonementId()
	public readonly abonementId: number

	@AbonementPropertiesSwagger.userId()
	public readonly userId: number
}
