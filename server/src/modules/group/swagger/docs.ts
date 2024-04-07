import { applyDecorators } from '@nestjs/common'

import {
	ApiOperation,
	ApiOkResponse,
	ApiUnauthorizedResponse,
	ApiForbiddenResponse,
	ApiBadRequestResponse,
	ApiNoContentResponse
} from '@nestjs/swagger'

import { GetAllGroupsOk, GetGroupByIdOk, CreateGroupOk, UpdateGroupOk } from './responses'

import { EGroupSwaggerMessages } from './messages.enum'

import { ESwaggerMessages } from '@/core/swagger'

export class GroupDocSwagger {
	static getAll() {
		return applyDecorators(
			ApiOperation({
				summary: 'Получить список всех групп',
				description: 'Только с ролью director'
			}),
			ApiOkResponse({ type: GetAllGroupsOk, description: 'Найденные группы' }),
			ApiUnauthorizedResponse({ description: ESwaggerMessages.UNAUTHORIZED }),
			ApiForbiddenResponse({ description: ESwaggerMessages.FORBIDDEN })
		)
	}

	static getById() {
		return applyDecorators(
			ApiOperation({
				summary: 'Получить группу по id',
				description: 'Только с ролью director'
			}),
			ApiOkResponse({ description: 'Найденная группа', type: GetGroupByIdOk }),
			ApiUnauthorizedResponse({ description: ESwaggerMessages.UNAUTHORIZED }),
			ApiForbiddenResponse({ description: ESwaggerMessages.FORBIDDEN }),
			ApiBadRequestResponse({ description: EGroupSwaggerMessages.GET_BY_ID })
		)
	}

	static create() {
		return applyDecorators(
			ApiOperation({
				summary: 'Создать новую группу',
				description: 'Только с ролью director'
			}),
			ApiUnauthorizedResponse({ description: ESwaggerMessages.UNAUTHORIZED }),
			ApiForbiddenResponse({ description: ESwaggerMessages.FORBIDDEN }),
			ApiBadRequestResponse({ description: EGroupSwaggerMessages.CREATE }),
			ApiOkResponse({ description: 'Результат создания', type: CreateGroupOk })
		)
	}

	static update() {
		return applyDecorators(
			ApiOperation({ summary: 'Изменить группу', description: 'Только с ролью director' }),
			ApiUnauthorizedResponse({ description: ESwaggerMessages.UNAUTHORIZED }),
			ApiForbiddenResponse({ description: ESwaggerMessages.FORBIDDEN }),
			ApiBadRequestResponse({ description: EGroupSwaggerMessages.UPDATE }),
			ApiOkResponse({ description: 'Результат изменения', type: UpdateGroupOk })
		)
	}

	static delete() {
		return applyDecorators(
			ApiNoContentResponse({ description: 'Успешно удалено' }),
			ApiOperation({ summary: 'Удалить группу', description: 'Только с ролью direction' }),
			ApiUnauthorizedResponse({ description: ESwaggerMessages.UNAUTHORIZED }),
			ApiForbiddenResponse({ description: ESwaggerMessages.FORBIDDEN }),
			ApiBadRequestResponse({ description: EGroupSwaggerMessages.DELETE })
		)
	}
}
