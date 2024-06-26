import { applyDecorators } from '@nestjs/common'
import { BaseDocSwagger, DocDecoratorsSwagger, ESwaggerMessages } from '@/core/swagger'
import { EStaffRole } from '@/core/enums'
import { ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger'
import {
	CreateAbonementOk,
	CreateUserAbonementOk,
	GetAbonementByIdOk,
	GetAllAbonementsOk,
	GetAllUserAbonementsOk,
	GetUserAbonementByIdOk,
	UpdateAbonementOk
} from './responses'

export class AbonementDocSwagger {
	public static getAll() {
		return applyDecorators(
			DocDecoratorsSwagger.getAll([EStaffRole.DIRECTOR]),
			ApiOkResponse({
				type: GetAllAbonementsOk,
				description: ESwaggerMessages.SUCCESSFULLY_GET_ALL
			}),
			BaseDocSwagger.authWithRole()
		)
	}

	public static getById() {
		return applyDecorators(
			DocDecoratorsSwagger.getById([EStaffRole.DIRECTOR]),
			ApiOkResponse({
				type: GetAbonementByIdOk,
				description: ESwaggerMessages.SUCCESSFULLY_GET_ONE
			}),
			ApiNotFoundResponse({ description: ESwaggerMessages.NOT_FOUND }),
			BaseDocSwagger.authWithRole()
		)
	}

	public static update() {
		return applyDecorators(
			DocDecoratorsSwagger.update(
				[EStaffRole.DIRECTOR],
				'Можно указать либо количество занятий, либо длительность'
			),
			ApiOkResponse({
				type: UpdateAbonementOk,
				description: ESwaggerMessages.SUCCESSFULLY_UPDATE
			}),
			ApiNotFoundResponse({
				description: ESwaggerMessages.NOT_FOUND
			}),
			BaseDocSwagger.authWithRole()
		)
	}

	public static create() {
		return applyDecorators(
			DocDecoratorsSwagger.create(
				[EStaffRole.DIRECTOR],
				'Можно указать либо количество занятий, либо длительность'
			),
			ApiOkResponse({
				type: CreateAbonementOk,
				description: ESwaggerMessages.SUCCESSFULLY_CREATE
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

	public static createUserAbonement() {
		return applyDecorators(
			DocDecoratorsSwagger.create([EStaffRole.DIRECTOR]),
			ApiOkResponse({
				type: CreateUserAbonementOk,
				description: ESwaggerMessages.SUCCESSFULLY_CREATE
			}),
			BaseDocSwagger.authWithRole()
		)
	}

	public static getByIdUserAbonement() {
		return applyDecorators(
			DocDecoratorsSwagger.getById([EStaffRole.DIRECTOR]),
			ApiOkResponse({
				type: GetUserAbonementByIdOk,
				description: ESwaggerMessages.SUCCESSFULLY_CREATE
			}),
			BaseDocSwagger.authWithRole()
		)
	}

	public static deleteUserAbonement() {
		return applyDecorators(
			DocDecoratorsSwagger.delete([EStaffRole.DIRECTOR]),
			BaseDocSwagger.authWithRole()
		)
	}

	public static getAllUserAbonement() {
		return applyDecorators(
			DocDecoratorsSwagger.getAll([EStaffRole.DIRECTOR]),
			ApiOkResponse({
				type: GetAllUserAbonementsOk,
				description: ESwaggerMessages.SUCCESSFULLY_GET_ALL
			}),
			BaseDocSwagger.authWithRole()
		)
	}
}
