import { applyDecorators } from '@nestjs/common'
import { ApiOkResponse, ApiNotFoundResponse } from '@nestjs/swagger'
import { DocDecoratorsSwagger, ESwaggerMessages } from '@/core/swagger'
import {
	GetAllDirectionsOk,
	GetDirectionByIdOk,
	CreateDirectionOk,
	UpdateDirectionOk
} from './responses'
import { BaseDocSwagger } from '@/core/swagger/docs'
import { EStaffRole } from '@/core/enums'

export class DirectionDocSwagger {
	public static getAll() {
		return applyDecorators(
			DocDecoratorsSwagger.getAll([EStaffRole.DIRECTOR]),
			ApiOkResponse({
				description: ESwaggerMessages.SUCCESSFULLY_GET_ALL,
				type: GetAllDirectionsOk
			}),
			BaseDocSwagger.authWithRole()
		)
	}

	public static getById() {
		return applyDecorators(
			DocDecoratorsSwagger.getById([EStaffRole.DIRECTOR]),
			ApiOkResponse({
				description: ESwaggerMessages.SUCCESSFULLY_GET_ONE,
				type: GetDirectionByIdOk
			}),
			ApiNotFoundResponse({ description: ESwaggerMessages.SUCCESSFULLY_GET_ONE }),
			BaseDocSwagger.authWithRole()
		)
	}

	public static create() {
		return applyDecorators(
			DocDecoratorsSwagger.create([EStaffRole.DIRECTOR]),
			ApiOkResponse({
				description: ESwaggerMessages.SUCCESSFULLY_CREATE,
				type: CreateDirectionOk
			}),
			BaseDocSwagger.authWithRole()
		)
	}

	public static update() {
		return applyDecorators(
			DocDecoratorsSwagger.update([EStaffRole.DIRECTOR]),
			ApiOkResponse({
				description: ESwaggerMessages.SUCCESSFULLY_UPDATE,
				type: UpdateDirectionOk
			}),
			ApiNotFoundResponse({ description: ESwaggerMessages.NOT_FOUND }),
			BaseDocSwagger.authWithRole()
		)
	}

	public static delete() {
		return applyDecorators(
			DocDecoratorsSwagger.delete([EStaffRole.DIRECTOR]),
			BaseDocSwagger.delete()
		)
	}
}
