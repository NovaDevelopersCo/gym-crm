export const userValidation = {
	fio: {
		minLength: 2,
		maxLength: 200
	},
	howKnow: {
		maxLength: 300,
		required: false
	},
	instagram: {
		minLength: 2,
		maxLength: 30,
		required: false
	},
	phone: {
		maxLength: 100,
		max: 99999999999
	},
	birthday: {
		required: false
	}
}
