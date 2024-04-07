import { EDirectionSwaggerMessages } from './messages.enum'
import { applyDecorators } from '@nestjs/common'

import {
	ApiOperation,
	ApiOkResponse,
	ApiUnauthorizedResponse,
	ApiForbiddenResponse,
	ApiBadRequestResponse,
	ApiNoContentResponse
} from '@nestjs/swagger'

import { ESwaggerMessages } from '@/core/swagger'

import {
	GetAllDirectionsOk,
	GetDirectionByIdOk,
	CreateDirectionOk,
	UpdateDirectionOk
} from './responses'

export class DirectionDocSwagger {
	static getAll() {
		return applyDecorators(
			ApiOperation({
				summary: 'Получить список всех направлений',
				description: 'Только с ролью director'
			}),
			ApiOkResponse({ description: 'Найденные направления', type: GetAllDirectionsOk }),
			ApiUnauthorizedResponse({ description: ESwaggerMessages.UNAUTHORIZED }),
			ApiForbiddenResponse({ description: ESwaggerMessages.FORBIDDEN })
		)
	}

	static getById() {
		return applyDecorators(
			ApiOperation({
				summary: 'Получить направление по id',
				description: 'Только с ролью director'
			}),
			ApiOkResponse({ description: 'Найденное направление', type: GetDirectionByIdOk }),
			ApiUnauthorizedResponse({ description: ESwaggerMessages.UNAUTHORIZED }),
			ApiForbiddenResponse({ description: ESwaggerMessages.FORBIDDEN }),
			ApiBadRequestResponse({ description: EDirectionSwaggerMessages.GET_BY_ID })
		)
	}

	static create() {
		return applyDecorators(
			ApiOperation({
				summary: 'Создать новое направление',
				description: 'Только с ролью director'
			}),
			ApiOkResponse({ description: 'Результат создания', type: CreateDirectionOk }),
			ApiUnauthorizedResponse({ description: ESwaggerMessages.UNAUTHORIZED }),
			ApiForbiddenResponse({ description: ESwaggerMessages.FORBIDDEN }),
			ApiBadRequestResponse({ description: EDirectionSwaggerMessages.CREATE })
		)
	}

	static update() {
		return applyDecorators(
			ApiOperation({
				summary: 'Изменить направление',
				description: 'Только с ролью director'
			}),
			ApiOkResponse({ description: 'Результат изменения', type: UpdateDirectionOk }),
			ApiUnauthorizedResponse({ description: ESwaggerMessages.UNAUTHORIZED }),
			ApiForbiddenResponse({ description: ESwaggerMessages.FORBIDDEN }),
			ApiBadRequestResponse({ description: EDirectionSwaggerMessages.UPDATE })
		)
	}

	static delete() {
		return applyDecorators(
			ApiNoContentResponse({ description: 'Успешно удалено' }),
			ApiOperation({
				summary: 'Удалить направление',
				description: 'Только с ролью director'
			}),
			ApiUnauthorizedResponse({ description: ESwaggerMessages.UNAUTHORIZED }),
			ApiForbiddenResponse({ description: ESwaggerMessages.FORBIDDEN }),
			ApiBadRequestResponse({ description: EDirectionSwaggerMessages.DELETE })
		)
	}
}
