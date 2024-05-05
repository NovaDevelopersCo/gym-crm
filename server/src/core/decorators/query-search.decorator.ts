import { IsEnum, IsOptional } from 'class-validator'
import { QuerySearchValidate } from './query-search-validate.decorator'
import { propertiesSwagger } from '../utils'
import type { TQuerySearchValidatorObj } from '@/core/types'

// * for swagger
export const QuerySearch = (
	eList: object,
	description: string,
	message: string,
	validator?: TQuerySearchValidatorObj
) => {
	const decorators = [IsOptional(), IsEnum(eList, { message })]

	if (validator) {
		decorators.push(QuerySearchValidate(validator))
	}

	return propertiesSwagger({
		validation: {
			required: false,
			description,
			enum: eList
		},
		decorators
	})
}
