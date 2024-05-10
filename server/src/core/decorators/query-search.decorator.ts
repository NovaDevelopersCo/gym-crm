import { IsEnum } from 'class-validator'
import { QuerySearchValidate } from './query-search-validate.decorator'
import { Property } from '../utils'
import type { TQuerySearchValidatorObj } from '@/core/types'

// * for swagger
export const QuerySearch = (
	eList: object,
	description: string,
	message: string,
	validator?: TQuerySearchValidatorObj
) => {
	const decorators = [IsEnum(eList, { message })]

	if (validator) {
		decorators.push(QuerySearchValidate(validator))
	}

	return new Property({
		required: false,
		description,
		enum: eList,
		decorators,
		validation: true
	}).exec()
}
