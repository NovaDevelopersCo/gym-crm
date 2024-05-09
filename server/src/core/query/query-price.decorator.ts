import { propertiesSwagger } from '../utils'
import { Type } from 'class-transformer'
import { PriceValidate } from '../decorators'

interface Parameters {
	description?: string
	field?: string
}

// TODO: написать example
export const PriceQueryDecorator = ({ description }: Parameters) => {
	return propertiesSwagger({
		example: '',
		description,
		required: false,
		decorators: [Type(() => Number), PriceValidate()]
	})
}
