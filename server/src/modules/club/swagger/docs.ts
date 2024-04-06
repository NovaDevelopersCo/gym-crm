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

import { GetAllClubsOk, GetClubByIdOk, CreateClubOk, UpdateClubOk } from './responses'
import { EClubSwaggerMessages } from './messages.enum'

export class ClubDocSwagger {
	static getAll() {
		return applyDecorators(
			ApiOperation({
				summary: 'Получить список всех клубов',
				description: 'Только с ролью director'
			}),
			ApiOkResponse({ type: GetAllClubsOk, description: 'Найденные клубы' }),
			ApiUnauthorizedResponse({ description: ESwaggerMessages.UNAUTHORIZED }),
			ApiForbiddenResponse({ description: ESwaggerMessages.FORBIDDEN })
		)
	}

	static getById() {
		return applyDecorators(
			ApiOperation({
				summary: 'Получить клуб по id',
				description: 'Только с ролью director'
			}),
			ApiOkResponse({ type: GetClubByIdOk, description: 'Найденный клуб' }),
			ApiUnauthorizedResponse({ description: ESwaggerMessages.UNAUTHORIZED }),
			ApiForbiddenResponse({ description: ESwaggerMessages.FORBIDDEN }),
			ApiBadRequestResponse({ description: EClubSwaggerMessages.GET_BY_ID })
		)
	}

	static create() {
		return applyDecorators(
			ApiOperation({
				summary: 'Создание нового клуба',
				description: 'Только с ролью director'
			}),
			ApiUnauthorizedResponse({ description: ESwaggerMessages.UNAUTHORIZED }),
			ApiForbiddenResponse({ description: ESwaggerMessages.FORBIDDEN }),
			ApiBadRequestResponse({ description: EClubSwaggerMessages.CREATE }),
			ApiOkResponse({ type: CreateClubOk, description: 'Результат создания' })
		)
	}

	static update() {
		return applyDecorators(
			ApiOperation({ summary: 'Изменить клуб', description: 'Только с ролью director' }),
			ApiUnauthorizedResponse({ description: ESwaggerMessages.UNAUTHORIZED }),
			ApiForbiddenResponse({ description: ESwaggerMessages.FORBIDDEN }),
			ApiBadRequestResponse({ description: EClubSwaggerMessages.UPDATE }),
			ApiOkResponse({ type: UpdateClubOk, description: 'Результат изменения' })
		)
	}

	static delete() {
		return applyDecorators(
			ApiNoContentResponse({ description: 'Успешно удалено' }),
			ApiOperation({ summary: 'Удалить клуб', description: 'Только с ролью director' }),
			ApiUnauthorizedResponse({ description: ESwaggerMessages.UNAUTHORIZED }),
			ApiForbiddenResponse({ description: ESwaggerMessages.FORBIDDEN }),
			ApiBadRequestResponse({ description: EClubSwaggerMessages.DELETE })
		)
	}
}
