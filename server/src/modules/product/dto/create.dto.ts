import { PropertyDecoratorsSwagger } from '@/core/swagger'
import { ProductDecoratorsSwagger } from '../swagger'

export class CreateProductDto {
	@ProductDecoratorsSwagger.name_(true)
	name: string

	@ProductDecoratorsSwagger.price(true)
	price: number

	@PropertyDecoratorsSwagger.clubId(true)
	club: number
}
