export type TQuerySearchBody = {
	maxLength?: number
	type?: ETypeSearch
	min?: number
	max?: number
}

export type TQuerySearchValidatorObj = {
	[key: string]: TQuerySearchBody
}

export enum ETypeSearch {
	NUMBER = 'number',
	BOOLEAN = 'boolean',
	STRING = 'string'
}
