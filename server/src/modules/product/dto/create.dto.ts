import { CommonPropertiesSwagger } from '@/core/swagger'
import { ProductPropertiesSwagger } from '../swagger'

export class CreateProductDto {
	@ProductPropertiesSwagger.name_()
	public readonly name: string

	@ProductPropertiesSwagger.price()
	public readonly price: number

	@CommonPropertiesSwagger.clubId()
	public readonly club: number
}
