import { CommonDtoSwagger } from '@/core/swagger'
import { ProductDtoSwagger } from '../swagger'

export class CreateProductDto {
	@ProductDtoSwagger.name_()
	name: string

	@ProductDtoSwagger.price()
	price: number

	@CommonDtoSwagger.clubId()
	club: number
}
