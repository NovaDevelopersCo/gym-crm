import { applyDecorators } from '@nestjs/common'
import { ApiOkResponse, ApiNotFoundResponse } from '@nestjs/swagger'
import { ESwaggerMessages, BaseDocSwagger, DocDecoratorsSwagger } from '@/core/swagger'
import { GetAllClubsOk, GetClubByIdOk, CreateClubOk, UpdateClubOk } from './responses'
import { EStaffRole } from '@/core/enums'

export class ClubDocSwagger {
	static getAll() {
		return applyDecorators(
			DocDecoratorsSwagger.getAll([EStaffRole.DIRECTOR]),
			ApiOkResponse({
				type: GetAllClubsOk,
				description: ESwaggerMessages.SUCCESSFULLY_GET_ALL
			}),
			BaseDocSwagger.authWithRole()
		)
	}

	static getById() {
		return applyDecorators(
			DocDecoratorsSwagger.getById([EStaffRole.DIRECTOR]),
			ApiOkResponse({
				type: GetClubByIdOk,
				description: ESwaggerMessages.SUCCESSFULLY_GET_ONE
			}),
			ApiNotFoundResponse({ description: ESwaggerMessages.NOT_FOUND }),
			BaseDocSwagger.authWithRole()
		)
	}

	static create() {
		return applyDecorators(
			DocDecoratorsSwagger.create([EStaffRole.DIRECTOR]),
			ApiOkResponse({
				type: CreateClubOk,
				description: ESwaggerMessages.SUCCESSFULLY_CREATE
			}),
			ApiNotFoundResponse({ description: ESwaggerMessages.NOT_FOUND }),
			BaseDocSwagger.authWithRole()
		)
	}

	static update() {
		return applyDecorators(
			DocDecoratorsSwagger.update([EStaffRole.DIRECTOR]),
			ApiOkResponse({
				type: UpdateClubOk,
				description: ESwaggerMessages.SUCCESSFULLY_UPDATE
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
