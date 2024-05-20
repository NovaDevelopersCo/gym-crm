import { registerDecorator } from 'class-validator'

// ! For query params
// ! max - min
export const PriceValidate = () => (object: object, propertyName: string) =>
	registerDecorator({
		name: 'priceValidate',
		target: object.constructor,
		propertyName,
		constraints: [],
		options: {},
		validator: {
			// * 1200 / [1222, 1221]
			// * price[0] - minValue
			// * price[1] - maxValue
			validate: value => {
				if (typeof value === 'number') return true

				if (Array.isArray(value)) {
					let boolean = false
					value.forEach(int => {
						if (isNaN(int)) boolean = true
					})

					if (boolean) return false

					if (value.length > 2) return false
					const min = +value[0] || 0
					const max = +value[1] || 0

					const isIntMin = Number.isInteger(min)
					const isIntMax = Number.isInteger(max)
					if (!isIntMax || !isIntMin) return false

					return true
				}
				return false
			},
			defaultMessage: () => 'Цена не валидна'
		}
	})
