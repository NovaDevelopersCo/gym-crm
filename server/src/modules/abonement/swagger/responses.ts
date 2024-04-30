import { PropertyDecoratorsSwagger } from '@/core/swagger'
import { AbonementPropertiesSwagger } from './properties'
import { PaginationDto } from '@/core/dto'
import { ApiProperty } from '@nestjs/swagger'

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
