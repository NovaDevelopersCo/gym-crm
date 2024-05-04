export const abonementValidation = {
	name: {
		minLength: 3,
		maxLength: 200
	},
	price: {
		minimum: 0,
		maximum: 999999
	},
	count: {
		minimum: 1,
		maximum: 999,
		nullable: true
	},
	duration: {
		minLength: 2,
		maxLength: 5,
		nullable: true
	}
}
