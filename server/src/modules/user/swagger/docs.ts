import { applyDecorators } from '@nestjs/common'
import {
	ApiBadRequestResponse,
	ApiBearerAuth,
	ApiCreatedResponse,
	ApiForbiddenResponse,
	ApiNoContentResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
	ApiUnauthorizedResponse
} from '@nestjs/swagger'
import { GetAllUserDto, GetUserByIdOk, ResponseUserDto } from './responses'
import { ESwaggerMessages } from '@/core/swagger'
import { EUserSwaggerMessages } from './messages.enum'

export class UserDocSwagger {
	static createQuestionnaireUser() {
		return applyDecorators(
			ApiBearerAuth('access-token'),
			ApiOperation({
				summary: 'Анкета регистрации пользователя',
				description: 'Только с ролями Admin и Director'
			}),
			ApiUnauthorizedResponse({ description: ESwaggerMessages.UNAUTHORIZED }),
			ApiForbiddenResponse({ description: ESwaggerMessages.FORBIDDEN }),
			ApiBadRequestResponse({ description: ESwaggerMessages.ERROR_VALIDATION }),
			ApiNotFoundResponse({ description: EUserSwaggerMessages.NO_FOUND_DEPENDENT_OBJECTS }),
			ApiCreatedResponse({
				description: 'Пользователь успешно добавлен',
				type: ResponseUserDto
			})
		)
	}

	static getOne() {
		return applyDecorators(
			ApiBearerAuth('access-token'),
			ApiOperation({
				summary: 'Поиск пользователя по id',
				description: 'Только с ролями Admin и Director'
			}),
			ApiUnauthorizedResponse({ description: ESwaggerMessages.UNAUTHORIZED }),
			ApiForbiddenResponse({ description: ESwaggerMessages.FORBIDDEN }),
			ApiBadRequestResponse({ description: ESwaggerMessages.ERROR_VALIDATION }),
			ApiNotFoundResponse({ description: EUserSwaggerMessages.GET_BY_ID }),
			ApiOkResponse({ description: 'Найденный пользователь', type: GetUserByIdOk })
		)
	}

	static getAll() {
		return applyDecorators(
			ApiBearerAuth('access-token'),
			ApiOperation({
				summary: 'Вывод всех пользователей с пагинацией',
				description: 'Только с ролями Admin и Director'
			}),
			ApiUnauthorizedResponse({ description: ESwaggerMessages.UNAUTHORIZED }),
			ApiForbiddenResponse({ description: ESwaggerMessages.FORBIDDEN }),
			ApiBadRequestResponse({ description: ESwaggerMessages.ERROR_VALIDATION }),
			ApiOkResponse({ description: 'Найденные пользователи', type: GetAllUserDto })
		)
	}

	static update() {
		return applyDecorators(
			ApiBearerAuth('access-token'),
			ApiOperation({
				summary: 'Обновление пользователя',
				description: 'Только с ролями Admin и Director'
			}),
			ApiUnauthorizedResponse({ description: ESwaggerMessages.UNAUTHORIZED }),
			ApiForbiddenResponse({ description: ESwaggerMessages.FORBIDDEN }),
			ApiBadRequestResponse({ description: ESwaggerMessages.ERROR_VALIDATION }),
			ApiNotFoundResponse({ description: EUserSwaggerMessages.GET_BY_ID }),
			ApiOkResponse({ description: 'Измененный пользователь', type: GetUserByIdOk })
		)
	}

	static delete() {
		return applyDecorators(
			ApiBearerAuth('access-token'),
			ApiOperation({
				summary: 'Удаление пользователя',
				description: 'Только с ролями Admin и Director'
			}),
			ApiUnauthorizedResponse({ description: ESwaggerMessages.UNAUTHORIZED }),
			ApiForbiddenResponse({ description: ESwaggerMessages.FORBIDDEN }),
			ApiNotFoundResponse({ description: EUserSwaggerMessages.GET_BY_ID }),
			ApiBadRequestResponse({ description: ESwaggerMessages.ERROR_VALIDATION }),
			ApiNoContentResponse({ description: 'Успешное удаление' })
		)
	}
}
