import { applyDecorators } from '@nestjs/common'
import {
	ApiOperation,
	ApiOkResponse,
	ApiNotFoundResponse,
	ApiCreatedResponse,
	ApiNoContentResponse
} from '@nestjs/swagger'
import { GetStaffByIdOk, GetAllStaffsOk, CreateStaffOk, UpdateStaffOk } from './responses'
import { ESwaggerMessages } from '@/core/swagger'
import { BaseDocSwagger } from '@/core/swagger/docs'

export class StaffDocSwagger {
	static create() {
		return applyDecorators(
			ApiOperation({
				summary: 'Создание нового профиля персонала',
				description: 'Только с ролью director'
			}),
			ApiCreatedResponse({
				description: ESwaggerMessages.SUCCESSFULLY_CREATE,
				type: CreateStaffOk
			}),
			BaseDocSwagger.authWithRole()
		)
	}

	static getById() {
		return applyDecorators(
			ApiOperation({
				summary: 'Получить профиль персонала по id',
				description: 'Только с ролью director'
			}),
			ApiNotFoundResponse({ description: ESwaggerMessages.NOT_FOUND }),
			ApiOkResponse({
				description: ESwaggerMessages.SUCCESSFULLY_GET_ONE,
				type: GetStaffByIdOk
			}),
			BaseDocSwagger.authWithRole()
		)
	}

	static getAll() {
		return applyDecorators(
			ApiOperation({
				summary: 'Получить список всех профилей персонала',
				description: 'Только с ролью director'
			}),
			ApiOkResponse({
				description: ESwaggerMessages.SUCCESSFULLY_GET_ALL,
				type: GetAllStaffsOk
			}),
			BaseDocSwagger.authWithRole()
		)
	}

	static update() {
		return applyDecorators(
			ApiOperation({
				summary: 'Изменить профиль персонала',
				description: 'Только с ролью director'
			}),
			ApiNotFoundResponse({ description: ESwaggerMessages.NOT_FOUND }),
			ApiOkResponse({
				description: ESwaggerMessages.SUCCESSFULLY_UPDATE,
				type: UpdateStaffOk
			}),
			BaseDocSwagger.authWithRole()
		)
	}

	static delete() {
		return applyDecorators(
			ApiOperation({
				summary: 'Удалить профиль персонала',
				description: 'Только с ролью director'
			}),
			BaseDocSwagger.delete()
		)
	}

	static updatePassword() {
		return applyDecorators(
			ApiOperation({
				summary: 'Обновить пароль профиля персонала',
				description: 'Только с ролью director'
			}),
			ApiNotFoundResponse({ description: ESwaggerMessages.NOT_FOUND }),
			ApiNoContentResponse({ description: ESwaggerMessages.SUCCESSFULLY_UPDATE }),
			BaseDocSwagger.authWithRole()
		)
	}
}
