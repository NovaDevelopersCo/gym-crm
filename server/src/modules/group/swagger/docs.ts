import { applyDecorators } from '@nestjs/common'
import { ApiOperation, ApiOkResponse, ApiNotFoundResponse } from '@nestjs/swagger'
import { GetAllGroupsOk, GetGroupByIdOk, CreateGroupOk, UpdateGroupOk } from './responses'
import { ESwaggerMessages } from '@/core/swagger'
import { BaseDocSwagger } from '@/core/swagger/docs'

export class GroupDocSwagger {
	static getAll() {
		return applyDecorators(
			ApiOperation({
				summary: 'Получить список всех групп',
				description: 'Только с ролью director'
			}),
			ApiOkResponse({
				type: GetAllGroupsOk,
				description: ESwaggerMessages.SUCCESSFULLY_GET_ALL
			}),
			BaseDocSwagger.authWithRole()
		)
	}

	static getById() {
		return applyDecorators(
			ApiOperation({
				summary: 'Получить группу по id',
				description: 'Только с ролью director'
			}),
			ApiOkResponse({
				description: ESwaggerMessages.SUCCESSFULLY_GET_ONE,
				type: GetGroupByIdOk
			}),
			ApiNotFoundResponse({ description: ESwaggerMessages.NOT_FOUND }),
			BaseDocSwagger.authWithRole()
		)
	}

	static create() {
		return applyDecorators(
			ApiOperation({
				summary: 'Создать новую группу',
				description: 'Только с ролью director'
			}),
			ApiOkResponse({
				description: ESwaggerMessages.SUCCESSFULLY_CREATE,
				type: CreateGroupOk
			}),
			ApiNotFoundResponse({ description: ESwaggerMessages.NO_FOUND_DEPENDENT_OBJECTS }),
			BaseDocSwagger.authWithRole()
		)
	}

	static update() {
		return applyDecorators(
			ApiOperation({ summary: 'Изменить группу', description: 'Только с ролью director' }),
			ApiOkResponse({
				description: ESwaggerMessages.SUCCESSFULLY_UPDATE,
				type: UpdateGroupOk
			}),
			ApiNotFoundResponse({ description: ESwaggerMessages.NOT_FOUND }),
			BaseDocSwagger.authWithRole()
		)
	}

	static delete() {
		return applyDecorators(
			ApiOperation({ summary: 'Удалить группу', description: 'Только с ролью direction' }),
			BaseDocSwagger.delete()
		)
	}
}
