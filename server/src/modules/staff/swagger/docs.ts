import { applyDecorators } from '@nestjs/common'
import {
	ApiOkResponse,
	ApiNotFoundResponse,
	ApiCreatedResponse,
	ApiNoContentResponse,
	ApiOperation
} from '@nestjs/swagger'
import { GetStaffByIdOk, GetAllStaffsOk, CreateStaffOk, UpdateStaffOk } from './responses'
import { DocDecoratorsSwagger, ESwaggerMessages } from '@/core/swagger'
import { BaseDocSwagger } from '@/core/swagger/docs'
import { EStaffRole } from '@/core/enums'

export class StaffDocSwagger {
	public static create() {
		return applyDecorators(
			DocDecoratorsSwagger.create([EStaffRole.DIRECTOR]),
			ApiCreatedResponse({
				description: ESwaggerMessages.SUCCESSFULLY_CREATE,
				type: CreateStaffOk
			}),
			BaseDocSwagger.authWithRole()
		)
	}

	public static getById() {
		return applyDecorators(
			DocDecoratorsSwagger.getById([EStaffRole.DIRECTOR]),
			ApiNotFoundResponse({ description: ESwaggerMessages.NOT_FOUND }),
			ApiOkResponse({
				description: ESwaggerMessages.SUCCESSFULLY_GET_ONE,
				type: GetStaffByIdOk
			}),
			BaseDocSwagger.authWithRole()
		)
	}

	public static getAll() {
		return applyDecorators(
			DocDecoratorsSwagger.getAll([EStaffRole.DIRECTOR]),
			ApiOkResponse({
				description: ESwaggerMessages.SUCCESSFULLY_GET_ALL,
				type: GetAllStaffsOk
			}),
			BaseDocSwagger.authWithRole()
		)
	}

	public static update() {
		return applyDecorators(
			DocDecoratorsSwagger.update([EStaffRole.DIRECTOR]),
			ApiNotFoundResponse({ description: ESwaggerMessages.NOT_FOUND }),
			ApiOkResponse({
				description: ESwaggerMessages.SUCCESSFULLY_UPDATE,
				type: UpdateStaffOk
			}),
			BaseDocSwagger.authWithRole()
		)
	}

	public static delete() {
		return applyDecorators(
			DocDecoratorsSwagger.delete([EStaffRole.DIRECTOR]),
			BaseDocSwagger.delete()
		)
	}

	public static updatePassword() {
		return applyDecorators(
			ApiOperation({
				summary: 'Изменить пароль профиля персонала',
				description: `Только с ролью ${EStaffRole.DIRECTOR}`
			}),
			ApiNotFoundResponse({ description: ESwaggerMessages.NOT_FOUND }),
			ApiNoContentResponse({ description: ESwaggerMessages.SUCCESSFULLY_UPDATE }),
			BaseDocSwagger.authWithRole()
		)
	}
}
