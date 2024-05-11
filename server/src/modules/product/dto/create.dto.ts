import { CommonPropertiesSwagger } from '@/core/swagger'
import { ProductPropertiesSwagger } from '../swagger'

export class CreateProductDto {
	@ProductPropertiesSwagger.name_(true)
	public readonly name: string

	@ProductPropertiesSwagger.price(true)
	public readonly price: number

	@CommonPropertiesSwagger.clubId()
	public readonly club: number
}
