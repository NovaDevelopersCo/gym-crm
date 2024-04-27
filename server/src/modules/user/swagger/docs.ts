import { applyDecorators } from '@nestjs/common'
import {
	ApiCreatedResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation
} from '@nestjs/swagger'
import { GetAllUsersOk, GetUserByIdOk, CreateUserOk } from './responses'
import { ESwaggerMessages } from '@/core/swagger'
import { BaseDocSwagger } from '@/core/swagger/docs'

export class UserDocSwagger {
	static create() {
		return applyDecorators(
			ApiOperation({
				summary: 'Создать нового пользователя',
				description: 'Только с ролями admin и director'
			}),
			ApiNotFoundResponse({ description: ESwaggerMessages.NO_FOUND_DEPENDENT_OBJECTS }),
			ApiCreatedResponse({
				description: ESwaggerMessages.SUCCESSFULLY_CREATE,
				type: CreateUserOk
			}),
			BaseDocSwagger.authWithRole()
		)
	}

	static getById() {
		return applyDecorators(
			ApiOperation({
				summary: 'Получить пользователя по id',
				description: 'Только с ролями admin и director'
			}),
			ApiNotFoundResponse({ description: ESwaggerMessages.NOT_FOUND }),
			ApiOkResponse({
				description: ESwaggerMessages.SUCCESSFULLY_GET_ONE,
				type: GetUserByIdOk
			}),
			BaseDocSwagger.authWithRole()
		)
	}

	static getAll() {
		return applyDecorators(
			ApiOperation({
				summary: 'Получить список всех пользователей',
				description: 'Только с ролями admin и director'
			}),
			ApiOkResponse({
				description: ESwaggerMessages.SUCCESSFULLY_GET_ALL,
				type: GetAllUsersOk
			}),
			BaseDocSwagger.authWithRole()
		)
	}

	static update() {
		return applyDecorators(
			ApiOperation({
				summary: 'Изменить пользователя',
				description: 'Только с ролями admin и director'
			}),
			ApiNotFoundResponse({ description: ESwaggerMessages.NOT_FOUND }),
			ApiOkResponse({
				description: ESwaggerMessages.SUCCESSFULLY_UPDATE,
				type: GetUserByIdOk
			}),
			BaseDocSwagger.authWithRole()
		)
	}

	static delete() {
		return applyDecorators(
			ApiOperation({
				summary: 'Удалить пользователя',
				description: 'Только с ролями admin и director'
			}),
			BaseDocSwagger.delete()
		)
	}
}
