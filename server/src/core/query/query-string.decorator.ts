import { IsString, MaxLength } from 'class-validator'
import { propertiesSwagger } from '../utils'

interface Parameters {
	description?: string
	maxLength?: number
	field?: string
}

export const StringQueryDecorator = ({ field, maxLength, description }: Parameters) => {
	return propertiesSwagger({
		example: 'Dock',
		description,
		maxLength,
		required: false,
		decorators: [
			IsString({ message: `Параметр ${field} в поиске должен быть` }),
			MaxLength(maxLength, {
				message: `Максимальная длина параметра ${field} должна быть ${maxLength}`
			})
		]
	})
}
