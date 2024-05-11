import { IsArray, IsInt } from 'class-validator'
import { Property } from '../utils'
import { Type } from 'class-transformer'

interface Parameters {
	description?: string
	field?: string
	example?: string
}

export const ArrayIdsQueryDecorator = ({ description, example, field }: Parameters) => {
	return new Property({
		example: example || `${field}[0]=1&${field}[1]=2`,
		description,
		required: false,
		decorators: [
			IsArray(),
			IsInt({ each: true, message: `Элементы массива должны быть числом` }),
			Type(() => Number)
		],
		validation: true
	}).exec()
}
