import { registerDecorator } from 'class-validator'
import { formatDate } from '../utils'

export const DurationValidate = () => (object: object, propertyName: string) => {
	return registerDecorator({
		name: 'durationValidate',
		target: object.constructor,
		propertyName,
		options: {},
		validator: {
			// 12y. / 1m. / 16d.
			validate: value => {
				const { prefix, count } = formatDate(value)

				const EXPECTED_PREFIXES = ['y.', 'm.', 'd.']

				const isValid = EXPECTED_PREFIXES.includes(prefix)

				if (!isValid) {
					return false
				}

				const isSpaces = String(count).length !== String(count).trim().length

				if (isSpaces) {
					return false
				}

				return Number.isInteger(count)
			},
			defaultMessage: () => 'Длительность абонемента невалидна'
		}
	})
}
