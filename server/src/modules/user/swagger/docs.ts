import { applyDecorators } from '@nestjs/common'
import {
	ApiCreatedResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation
} from '@nestjs/swagger'
import { GetAllUserDto, GetUserByIdOk, ResponseUserDto } from './responses'
import { ESwaggerMessages } from '@/core/swagger'
import { BaseDocSwagger } from '@/core/swagger/docs'

export class UserDocSwagger {
	static createQuestionnaireUser() {
		return applyDecorators(
			ApiOperation({
				summary: 'Анкета регистрации пользователя',
				description: 'Только с ролями Admin и Director'
			}),
			ApiNotFoundResponse({ description: ESwaggerMessages.NO_FOUND_DEPENDENT_OBJECTS }),
			ApiCreatedResponse({
				description: ESwaggerMessages.SUCCESSFULLY_CREATE,
				type: ResponseUserDto
			}),
			BaseDocSwagger.authWithRole()
		)
	}

	static getOne() {
		return applyDecorators(
			ApiOperation({
				summary: 'Поиск пользователя по id',
				description: 'Только с ролями Admin и Director'
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
				summary: 'Вывод всех пользователей с пагинацией',
				description: 'Только с ролями Admin и Director'
			}),
			ApiOkResponse({
				description: ESwaggerMessages.SUCCESSFULLY_GET_ALL,
				type: GetAllUserDto
			}),
			BaseDocSwagger.authWithRole()
		)
	}

	static update() {
		return applyDecorators(
			ApiOperation({
				summary: 'Обновление пользователя',
				description: 'Только с ролями Admin и Director'
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
				summary: 'Удаление пользователя',
				description: 'Только с ролями Admin и Director'
			}),
			BaseDocSwagger.delete()
		)
	}
}
