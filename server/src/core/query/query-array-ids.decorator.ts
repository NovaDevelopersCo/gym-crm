import { IsArray, IsInt } from 'class-validator'
import { propertiesSwagger } from '../utils'
import { Type } from 'class-transformer'

interface Parameters {
	description?: string
	field?: string
}

// TODO: написать example
export const ArrayIdsQueryDecorator = ({ description }: Parameters) => {
	return propertiesSwagger({
		example: '',
		description,
		required: false,
		decorators: [
			Type(() => Number),
			IsArray(),
			IsInt({ each: true, message: `Элементы массива должны быть числом` })
		]
	})
}
