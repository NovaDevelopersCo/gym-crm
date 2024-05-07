import { CommonDtoSwagger } from '@/core/swagger'
import { AbonementDtoSwagger } from './dto'
import { PaginationDto } from '@/core/dto'
import { ApiProperty, OmitType } from '@nestjs/swagger'
import { UserAbonementUser } from '@/modules/user/swagger'

class AbonementDto {
	@CommonDtoSwagger.id()
	id: number

	@AbonementDtoSwagger.count()
	count: number

	@AbonementDtoSwagger.duration()
	duration: string

	@AbonementDtoSwagger.name_()
	name: string

	@AbonementDtoSwagger.price()
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
	@AbonementDtoSwagger.isFinish()
	isFinish: boolean

	@AbonementDtoSwagger.start()
	start: string

	@AbonementDtoSwagger.end()
	end: string

	@AbonementDtoSwagger.user()
	user: UserAbonementUser

	@ApiProperty({
		type: AbonementDto
	})
	abonement: AbonementDto

	@CommonDtoSwagger.id()
	id: number

	@AbonementDtoSwagger.price()
	price: number

	@AbonementDtoSwagger.count()
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
