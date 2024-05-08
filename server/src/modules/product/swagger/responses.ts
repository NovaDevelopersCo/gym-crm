import { PaginationResponse } from '@/core/swagger'
import { GroupClub } from '@/modules/club/swagger'
import { ApiProperty, IntersectionType, PickType, OmitType } from '@nestjs/swagger'
import { ProductEntity } from '../entities'

export class ProductDto extends OmitType(ProductEntity, ['orders']) {}
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
export class UpdateProductOk extends IntersectionType(ProductDto, ClubWithId) {}

export class GetAllProductsOk extends PaginationResponse {
	@ApiProperty({ isArray: true })
	items: GetProductByIdOk
}

export class CreateProductOk extends IntersectionType(ProductDto, ClubWithId) {}
