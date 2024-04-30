export const abonementValidation = {
	name: {
		minLength: 3,
		maxLength: 200
	},
	price: {
		minimum: 0,
		maximum: 9999999
	},
	count: {
		minimum: 1,
		maximum: 999,
		required: false,
		nullable: true
	},
	duration: {
		minLength: 2,
		maxLength: 10,
		required: false,
		nullable: true
	}
}
