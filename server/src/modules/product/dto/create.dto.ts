import { CommonDtoSwagger } from '@/core/swagger'
import { ProductDtoSwagger } from '../swagger'

export class CreateProductDto {
	@ProductDtoSwagger.name_()
	public readonly name: string

	@ProductDtoSwagger.price()
	public readonly price: number

	@CommonDtoSwagger.clubId()
	public readonly club: number
}
