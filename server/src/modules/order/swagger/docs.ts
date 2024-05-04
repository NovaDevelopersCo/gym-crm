import { ESwaggerMessages } from '@/core/swagger'
import { BaseDocSwagger } from '@/core/swagger/docs'
import { applyDecorators } from '@nestjs/common'
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger'
import { CreateOrderOk, GetAllOrdersOk, GetOrderByIdOk } from './responses'

export class OrderDocSwagger {
	static getAll() {
		return applyDecorators(
			ApiOperation({
				summary: 'Получить список всех товаров',
				// ! ==
				description: 'Только с ролью director'
			}),
			ApiOkResponse({
				type: GetAllOrdersOk,
				description: ESwaggerMessages.SUCCESSFULLY_GET_ALL
			}),
			BaseDocSwagger.authWithRole()
		)
	}

	static getById() {
		return applyDecorators(
			ApiOperation({
				summary: 'Получить товар по id',
				// ! ==
				description: 'Только с ролью director'
			}),
			ApiOkResponse({
				description: ESwaggerMessages.SUCCESSFULLY_GET_ONE,
				type: GetOrderByIdOk
			}),
			ApiNotFoundResponse({ description: ESwaggerMessages.NOT_FOUND }),
			BaseDocSwagger.authWithRole()
		)
	}

	static create() {
		return applyDecorators(
			ApiOperation({
				summary: 'Создать новый товар',
				// ! ==
				description: 'Только с ролью director'
			}),
			ApiOkResponse({
				description: ESwaggerMessages.SUCCESSFULLY_CREATE,
				type: CreateOrderOk
			}),
			ApiNotFoundResponse({ description: ESwaggerMessages.NO_FOUND_DEPENDENT_OBJECTS }),
			BaseDocSwagger.authWithRole()
		)
	}

	static delete() {
		return applyDecorators(
			ApiOperation({
				summary: 'Удалить товар',
				// ! ===
				description: 'Только с ролью direction'
			}),
			BaseDocSwagger.delete()
		)
	}
}
