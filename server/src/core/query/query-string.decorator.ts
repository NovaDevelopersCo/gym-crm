import { IsString, MaxLength } from 'class-validator'
import { Property } from '../utils'

interface Parameters {
	description?: string
	maxLength?: number
	field?: string
}

export const StringQueryDecorator = ({ field, maxLength, description }: Parameters) => {
	return new Property({
		example: 'Dock',
		description,
		maxLength,
		required: false,
		decorators: [
			IsString({ message: `Параметр ${field} в поиске должен быть` }),
			MaxLength(maxLength, {
				message: `Максимальная длина параметра ${field} должна быть ${maxLength}`
			})
		],
		validation: true
	}).exec()
}
