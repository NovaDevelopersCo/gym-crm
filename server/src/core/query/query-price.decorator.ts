import { Property } from '../utils'
import { Type } from 'class-transformer'
import { PriceValidate } from '../decorators'

interface Parameters {
	description?: string
	field?: string
}

// TODO: написать example
export const PriceQueryDecorator = ({ description }: Parameters) => {
	return new Property({
		example: 'price=1213 | price[0]=13&price[1]=1000 ',
		description,
		required: false,
		decorators: [Type(() => Number), PriceValidate()],
		validation: true
	}).exec()
}
