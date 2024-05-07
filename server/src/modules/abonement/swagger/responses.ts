import { PaginationDto } from '@/core/dto'
import { ApiProperty, OmitType, PickType } from '@nestjs/swagger'
import { AbonementEntity, UserAbonementEntity } from '../entities'

class AbonementDto extends PickType(AbonementEntity, [
	'id',
	'count',
	'duration',
	'name',
	'price'
]) {}

export class GetAbonementByIdOk extends AbonementDto {}
export class CreateAbonementOk extends AbonementDto {}
export class UpdateAbonementOk extends AbonementDto {}
export class GetAllAbonementsOk extends PaginationDto {
	@ApiProperty({
		isArray: true
	})
	items: AbonementDto
}

class UserAbonementDto extends UserAbonementEntity {}

export class GetUserAbonementByIdOk extends UserAbonementDto {}
export class CreateUserAbonementOk extends OmitType(UserAbonementDto, ['user', 'abonement']) {}
export class GetAllUserAbonementsOk extends PaginationDto {
	@ApiProperty({
		isArray: true
	})
	items: UserAbonementDto
}
