import { PropertyDecoratorsSwagger } from '@/core/swagger'
import { AbonementPropertiesSwagger } from './properties'
import { PaginationDto } from '@/core/dto'
import { ApiProperty, OmitType } from '@nestjs/swagger'
import { UserAbonementUser } from '@/modules/user/swagger'

class AbonementDto {
	@PropertyDecoratorsSwagger.id()
	id: number

	@AbonementPropertiesSwagger.count()
	count: number

	@AbonementPropertiesSwagger.duration()
	duration: string

	@AbonementPropertiesSwagger.name_()
	name: string

	@AbonementPropertiesSwagger.price()
	price: number
}

export class GetAbonementByIdOk extends AbonementDto {}
export class CreateAbonementOk extends AbonementDto {}
export class UpdateAbonementOk extends AbonementDto {}
export class GetAllAbonementsOk extends PaginationDto {
	@ApiProperty({
		isArray: true
	})
	items: AbonementDto
}

class UserAbonementDto {
	@AbonementPropertiesSwagger.isFinish()
	isFinish: boolean

	@AbonementPropertiesSwagger.start()
	start: string

	@AbonementPropertiesSwagger.end()
	end: string

	@AbonementPropertiesSwagger.user()
	user: UserAbonementUser

	@ApiProperty({
		type: AbonementDto
	})
	abonement: AbonementDto

	@PropertyDecoratorsSwagger.id()
	id: number

	@AbonementPropertiesSwagger.price()
	price: number

	@AbonementPropertiesSwagger.count()
	count: number
}

export class GetUserAbonementByIdOk extends UserAbonementDto {}
export class CreateUserAbonementOk extends OmitType(UserAbonementDto, ['user', 'abonement']) {}
export class GetAllUserAbonementsOk extends PaginationDto {
	@ApiProperty({
		isArray: true
	})
	items: UserAbonementDto
}
