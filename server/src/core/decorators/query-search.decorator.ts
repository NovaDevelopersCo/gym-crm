import { IsEnum, IsOptional } from 'class-validator'
import { QuerySearchValidate } from './query-search-validate.decorator'
import { propertiesSwagger } from '../utils'

import type { TQuerySearchValidatorObj } from '@/core/types'

// * for swagger
export const QuerySearch = <T extends string = ''>(
	eList: object,
	description: string,
	message: string,
	validator?: TQuerySearchValidatorObj<T>
) => {
	const decorators = [IsOptional(), IsEnum(eList, { message })]

	if (validator) {
		decorators.push(QuerySearchValidate<T>(validator))
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
