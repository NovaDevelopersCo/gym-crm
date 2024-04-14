import { applyDecorators } from '@nestjs/common'
import { ApiOperation, ApiOkResponse, ApiNotFoundResponse } from '@nestjs/swagger'
import { ESwaggerMessages } from '@/core/swagger'
import { GetAllClubsOk, GetClubByIdOk, CreateClubOk, UpdateClubOk } from './responses'
import { BaseDocSwagger } from '@/core/swagger/docs'

export class ClubDocSwagger {
	static getAll() {
		return applyDecorators(
			ApiOperation({
				summary: 'Получить список всех клубов',
				description: 'Только с ролью director'
			}),
			ApiOkResponse({
				type: GetAllClubsOk,
				description: ESwaggerMessages.SUCCESSFULLY_GET_ALL
			}),
			BaseDocSwagger.authWithRole()
		)
	}

	static getById() {
		return applyDecorators(
			ApiOperation({
				summary: 'Получить клуб по id',
				description: 'Только с ролью director'
			}),
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
			ApiOperation({
				summary: 'Создание нового клуба',
				description: 'Только с ролью director'
			}),
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
			ApiOperation({ summary: 'Изменить клуб', description: 'Только с ролью director' }),
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
			ApiOperation({ summary: 'Удалить клуб', description: 'Только с ролью director' }),
			BaseDocSwagger.delete()
		)
	}
}
