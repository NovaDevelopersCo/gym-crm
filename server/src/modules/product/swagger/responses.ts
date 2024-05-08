import { PaginationResponse } from '@/core/swagger'
import { GroupClub } from '@/modules/club/swagger'
import { ApiProperty, IntersectionType, PickType, OmitType } from '@nestjs/swagger'
import { ProductEntity } from '../entities'

export class ProductDto extends OmitType(ProductEntity, ['orders']) {}
export class FullClub {
	@ApiProperty({ type: () => GroupClub })
	public readonly club: GroupClub
}

export class ClubId extends PickType(GroupClub, ['id']) {}

export class ClubWithId {
	@ApiProperty({ type: () => ClubId })
	public club: ClubId
}

export class GetProductByIdOk extends IntersectionType(ProductDto, FullClub) {}
export class UpdateProductOk extends IntersectionType(ProductDto, ClubWithId) {}

export class GetAllProductsOk extends PaginationResponse {
	@ApiProperty({ isArray: true })
	public items: GetProductByIdOk
}

export class CreateProductOk extends IntersectionType(ProductDto, ClubWithId) {}
