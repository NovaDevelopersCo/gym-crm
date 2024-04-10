export type TQuerySearchValidatorObj<T extends string = ''> = {
	[key in T]: {
		maxLength?: number
		minLength?: number
	}
}
