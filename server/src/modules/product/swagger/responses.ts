import { IdDto, PaginationResponse } from '@/core/swagger'
import { ClubDto } from '@/modules/club/swagger'
import { ApiProperty, OmitType } from '@nestjs/swagger'
import { ProductDto } from './dto'

export class Product extends ProductDto {
	@ApiProperty({ type: () => ClubDto })
	public readonly club: ClubDto
}

export class GetProductByIdOk extends Product {}
export class GetAllProductsOk extends PaginationResponse {
	@ApiProperty({ isArray: true })
	public items: GetProductByIdOk
}

export class CreateProductOk extends OmitType(Product, ['club']) {
	@ApiProperty({
		type: () => IdDto
	})
	public readonly club: IdDto
}
export class UpdateProductOk extends CreateProductOk {}
