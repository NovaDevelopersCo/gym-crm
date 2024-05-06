import { ApiOperation } from '@nestjs/swagger'
import { ESwaggerMessages } from './messages.enum'
import { formatRolesString } from './utils'

export class DocDecoratorsSwagger {
	static getById(roles: string[], description = '') {
		return ApiOperation({
			summary: ESwaggerMessages.GET_BY_ID_DESCRIPTION,
			description: formatRolesString(roles) + (description ? '. ' + description : '')
		})
	}

	static getAll(roles: string[], description = '') {
		return ApiOperation({
			summary: ESwaggerMessages.GET_ALL_DESCRIPTION,
			description: formatRolesString(roles) + (description ? '. ' + description : '')
		})
	}

	static create(roles: string[], description: string = '') {
		return ApiOperation({
			summary: ESwaggerMessages.CREATE_DESCRIPTION,
			description: formatRolesString(roles) + (description ? '. ' + description : '')
		})
	}

	static delete(roles: string[], description: string = '') {
		return ApiOperation({
			summary: ESwaggerMessages.DELETE_DESCRIPTION,
			description: formatRolesString(roles) + (description ? '. ' + description : '')
		})
	}

	static update(roles: string[], description: string = '') {
		return ApiOperation({
			summary: ESwaggerMessages.UPDATE_DESCRIPTION,
			description: formatRolesString(roles) + (description ? '. ' + description : '')
		})
	}
}
