import { applyDecorators } from '@nestjs/common'
import { ApiOkResponse, ApiNotFoundResponse } from '@nestjs/swagger'
import { GetAllGroupsOk, GetGroupByIdOk, CreateGroupOk, UpdateGroupOk } from './responses'
import { DocDecoratorsSwagger, ESwaggerMessages, BaseDocSwagger } from '@/core/swagger'
import { EStaffRole } from '@/core/enums'

export class GroupDocSwagger {
	static getAll() {
		return applyDecorators(
			DocDecoratorsSwagger.getAll([EStaffRole.DIRECTOR]),
			ApiOkResponse({
				type: GetAllGroupsOk,
				description: ESwaggerMessages.SUCCESSFULLY_GET_ALL
			}),
			BaseDocSwagger.authWithRole()
		)
	}

	static getById() {
		return applyDecorators(
			DocDecoratorsSwagger.getById([EStaffRole.DIRECTOR]),
			ApiOkResponse({
				description: ESwaggerMessages.SUCCESSFULLY_GET_ONE,
				type: GetGroupByIdOk
			}),
			ApiNotFoundResponse({ description: ESwaggerMessages.NOT_FOUND }),
			BaseDocSwagger.authWithRole()
		)
	}

	static create() {
		return applyDecorators(
			DocDecoratorsSwagger.create([EStaffRole.DIRECTOR]),
			ApiOkResponse({
				description: ESwaggerMessages.SUCCESSFULLY_CREATE,
				type: CreateGroupOk
			}),
			ApiNotFoundResponse({ description: ESwaggerMessages.NO_FOUND_DEPENDENT_OBJECTS }),
			BaseDocSwagger.authWithRole()
		)
	}

	static update() {
		return applyDecorators(
			DocDecoratorsSwagger.update([EStaffRole.DIRECTOR]),
			ApiOkResponse({
				description: ESwaggerMessages.SUCCESSFULLY_UPDATE,
				type: UpdateGroupOk
			}),
			ApiNotFoundResponse({ description: ESwaggerMessages.NOT_FOUND }),
			BaseDocSwagger.authWithRole()
		)
	}

	static delete() {
		return applyDecorators(
			DocDecoratorsSwagger.delete([EStaffRole.DIRECTOR]),
			BaseDocSwagger.delete()
		)
	}
}
