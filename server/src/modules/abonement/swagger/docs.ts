import { applyDecorators } from '@nestjs/common'
import { BaseDocSwagger, DocDecoratorsSwagger, ESwaggerMessages } from '@/core/swagger'
import { EStaffRole } from '@/core/enums'
import { ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger'
import {
	CreateAbonementOk,
	GetAbonementByIdOk,
	GetAllAbonementsOk,
	UpdateAbonementOk
} from './responses'

export class AbonementDocSwagger {
	static getAll() {
		return applyDecorators(
			DocDecoratorsSwagger.getAll([EStaffRole.DIRECTOR]),
			ApiOkResponse({
				type: GetAllAbonementsOk,
				description: ESwaggerMessages.SUCCESSFULLY_GET_ALL
			}),
			BaseDocSwagger.authWithRole()
		)
	}

	static getById() {
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

	static update() {
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

	static create() {
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

	static delete() {
		return applyDecorators(
			DocDecoratorsSwagger.delete([EStaffRole.DIRECTOR]),
			BaseDocSwagger.delete()
		)
	}
}
