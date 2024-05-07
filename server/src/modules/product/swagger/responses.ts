import { CommonDtoSwagger, PaginationResponse } from '@/core/swagger'
import { GroupClub } from '@/modules/club/swagger'
import { ProductDtoSwagger } from './dto'
import { ApiProperty, IntersectionType, PickType } from '@nestjs/swagger'

export class ProductDto {
	@CommonDtoSwagger.id()
	id: number

	@ProductDtoSwagger.name_()
	name: string

	@ProductDtoSwagger.price()
	price: number
}
export class FullClub {
	@ApiProperty({ type: () => GroupClub })
	club: GroupClub
}

export class ClubId extends PickType(GroupClub, ['id']) {}

export class ClubWithId {
	@ApiProperty({ type: () => ClubId })
	club: ClubId
}

export class GetProductByIdOk extends IntersectionType(ProductDto, FullClub) {}
// TODO: update
export class UpdateProductOk extends IntersectionType(ProductDto, ClubWithId) {}

export class GetAllProductsOk extends PaginationResponse {
	@ApiProperty({ isArray: true })
	items: GetProductByIdOk
}

export class CreateProductOk extends IntersectionType(ProductDto, ClubWithId) {}
