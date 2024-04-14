import { applyDecorators } from '@nestjs/common'
import {
	ApiOperation,
	ApiOkResponse,
	ApiUnauthorizedResponse,
	ApiForbiddenResponse,
	ApiBadRequestResponse,
	ApiNoContentResponse,
	ApiNotFoundResponse
} from '@nestjs/swagger'
import { StaffDto, GetOneStaff } from './responses'
import { EStaffSwaggerMessages } from './messages.enum'
import { ESwaggerMessages } from '@/core/swagger'

// ! update after pull request #32
// ! base swagger
export class StaffDocSwagger {
	static create() {
		return applyDecorators(
			ApiOperation({
				summary: 'Создание нового профиля персонала',
				description: 'Только с ролью director'
			}),
			ApiOkResponse({ description: 'Профиль успешно создан', type: StaffDto }),
			ApiUnauthorizedResponse({ description: ESwaggerMessages.UNAUTHORIZED }),
			ApiForbiddenResponse({ description: ESwaggerMessages.FORBIDDEN }),
			ApiBadRequestResponse({ description: EStaffSwaggerMessages.CREATE }),
			ApiBadRequestResponse()
		)
	}

	static getById() {
		return applyDecorators(
			ApiOperation({
				summary: 'Получение персонала по id',
				//! обдумать
				description: 'Только с ролью director и admin'
			}),
			ApiUnauthorizedResponse({ description: ESwaggerMessages.UNAUTHORIZED }),
			ApiForbiddenResponse({ description: ESwaggerMessages.FORBIDDEN }),

			ApiOkResponse({ description: 'Полученный персонал', type: GetOneStaff }),
			ApiBadRequestResponse(),
			ApiNotFoundResponse()
		)
	}

	static getAll() {
		return applyDecorators(
			ApiOperation({
				summary: 'Получение списка персонала, с пагинацией',
				//! обдумать
				description: 'Только с ролью director и admin'
			}),
			ApiUnauthorizedResponse({ description: ESwaggerMessages.UNAUTHORIZED }),
			ApiForbiddenResponse({ description: ESwaggerMessages.FORBIDDEN }),
			ApiBadRequestResponse()
		)
	}

	static update() {
		return applyDecorators(
			ApiOperation({
				summary: 'Изменение данных персонала',
				//! обдумать
				description: 'Только с ролью director/admin'
			}),
			ApiUnauthorizedResponse({ description: ESwaggerMessages.UNAUTHORIZED }),
			ApiForbiddenResponse({ description: ESwaggerMessages.FORBIDDEN }),
			ApiOkResponse({ description: 'Профиль успешно обновлен', type: StaffDto }),
			ApiBadRequestResponse(),
			ApiNotFoundResponse()
		)
	}

	static delete() {
		return applyDecorators(
			ApiOperation({
				summary: 'Удаление персонала',
				//! обдумать
				description: 'Только с ролью director'
			}),
			ApiUnauthorizedResponse({ description: ESwaggerMessages.UNAUTHORIZED }),
			ApiForbiddenResponse({ description: ESwaggerMessages.FORBIDDEN }),
			//! replace on variable
			ApiNoContentResponse({ description: 'Успешно удалено' }),
			ApiBadRequestResponse(),
			ApiNotFoundResponse()
		)
	}
}
