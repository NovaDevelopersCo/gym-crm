import { applyDecorators } from '@nestjs/common'
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger'
import { GetAllUsersOk, GetUserByIdOk, CreateUserOk, UpdateUserOk } from './responses'
import { DocDecoratorsSwagger, ESwaggerMessages } from '@/core/swagger'
import { BaseDocSwagger } from '@/core/swagger/docs'
import { EStaffRole } from '@/core/enums'

export class UserDocSwagger {
	public static create() {
		return applyDecorators(
			DocDecoratorsSwagger.create([EStaffRole.DIRECTOR, EStaffRole.ADMIN]),
			ApiNotFoundResponse({ description: ESwaggerMessages.NO_FOUND_DEPENDENT_OBJECTS }),
			ApiCreatedResponse({
				description: ESwaggerMessages.SUCCESSFULLY_CREATE,
				type: CreateUserOk
			}),
			BaseDocSwagger.authWithRole()
		)
	}

	public static getById() {
		return applyDecorators(
			DocDecoratorsSwagger.getById([EStaffRole.DIRECTOR, EStaffRole.ADMIN]),
			ApiNotFoundResponse({ description: ESwaggerMessages.NOT_FOUND }),
			ApiOkResponse({
				description: ESwaggerMessages.SUCCESSFULLY_GET_ONE,
				type: GetUserByIdOk
			}),
			BaseDocSwagger.authWithRole()
		)
	}

	public static getAll() {
		return applyDecorators(
			DocDecoratorsSwagger.getAll([EStaffRole.DIRECTOR, EStaffRole.ADMIN]),
			ApiOkResponse({
				description: ESwaggerMessages.SUCCESSFULLY_GET_ALL,
				type: GetAllUsersOk
			}),
			BaseDocSwagger.authWithRole()
		)
	}

	public static update() {
		return applyDecorators(
			DocDecoratorsSwagger.update([EStaffRole.DIRECTOR, EStaffRole.ADMIN]),
			ApiNotFoundResponse({ description: ESwaggerMessages.NOT_FOUND }),
			ApiOkResponse({
				description: ESwaggerMessages.SUCCESSFULLY_UPDATE,
				type: UpdateUserOk
			}),
			BaseDocSwagger.authWithRole()
		)
	}

	public static delete() {
		return applyDecorators(
			DocDecoratorsSwagger.delete([EStaffRole.DIRECTOR, EStaffRole.ADMIN]),
			BaseDocSwagger.delete()
		)
	}
}
