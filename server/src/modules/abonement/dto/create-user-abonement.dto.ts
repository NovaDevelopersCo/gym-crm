import { PropertyDecoratorsSwagger } from '@/core/swagger'

export class CreateUserAbonementDto {
	@PropertyDecoratorsSwagger.abonementId(true)
	abonementId: number

	@PropertyDecoratorsSwagger.userId(true)
	userId: number
}
