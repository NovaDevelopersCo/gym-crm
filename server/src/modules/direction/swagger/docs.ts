import { applyDecorators } from '@nestjs/common'
import { ApiOperation, ApiOkResponse, ApiNotFoundResponse } from '@nestjs/swagger'
import { ESwaggerMessages } from '@/core/swagger'
import {
	GetAllDirectionsOk,
	GetDirectionByIdOk,
	CreateDirectionOk,
	UpdateDirectionOk
} from './responses'
import { BaseDocSwagger } from '@/core/swagger/docs'

export class DirectionDocSwagger {
	static getAll() {
		return applyDecorators(
			ApiOperation({
				summary: 'Получить список всех направлений',
				description: 'Только с ролью director'
			}),
			ApiOkResponse({
				description: ESwaggerMessages.SUCCESSFULLY_GET_ALL,
				type: GetAllDirectionsOk
			}),
			BaseDocSwagger.authWithRole()
		)
	}

	static getById() {
		return applyDecorators(
			ApiOperation({
				summary: 'Получить направление по id',
				description: 'Только с ролью director'
			}),
			ApiOkResponse({
				description: ESwaggerMessages.SUCCESSFULLY_GET_ONE,
				type: GetDirectionByIdOk
			}),
			ApiNotFoundResponse({ description: ESwaggerMessages.SUCCESSFULLY_GET_ONE }),
			BaseDocSwagger.authWithRole()
		)
	}

	static create() {
		return applyDecorators(
			ApiOperation({
				summary: 'Создать новое направление',
				description: 'Только с ролью director'
			}),
			ApiOkResponse({
				description: ESwaggerMessages.SUCCESSFULLY_CREATE,
				type: CreateDirectionOk
			}),
			BaseDocSwagger.authWithRole()
		)
	}

	static update() {
		return applyDecorators(
			ApiOperation({
				summary: 'Изменить направление',
				description: 'Только с ролью director'
			}),
			ApiOkResponse({
				description: ESwaggerMessages.SUCCESSFULLY_UPDATE,
				type: UpdateDirectionOk
			}),
			ApiNotFoundResponse({ description: ESwaggerMessages.NOT_FOUND }),
			BaseDocSwagger.authWithRole()
		)
	}

	static delete() {
		return applyDecorators(
			ApiOperation({
				summary: 'Удалить направление',
				description: 'Только с ролью director'
			}),
			BaseDocSwagger.delete()
		)
	}
}
