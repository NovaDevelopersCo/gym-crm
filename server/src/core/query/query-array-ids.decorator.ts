import { IsArray, IsInt } from 'class-validator'
import { Property } from '../utils'
import { Type } from 'class-transformer'

interface Parameters {
	description?: string
	field?: string
}

// TODO: написать example
export const ArrayIdsQueryDecorator = ({ description }: Parameters) => {
	return new Property({
		example: '',
		description,
		required: false,
		decorators: [
			Type(() => Number),
			IsArray(),
			IsInt({ each: true, message: `Элементы массива должны быть числом` })
		],
		validation: true
	}).exec()
}
