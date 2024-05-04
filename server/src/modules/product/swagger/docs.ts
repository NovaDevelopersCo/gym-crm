import { applyDecorators } from '@nestjs/common'
import { ApiOperation, ApiOkResponse, ApiNotFoundResponse } from '@nestjs/swagger'
import { ESwaggerMessages } from '@/core/swagger'
import { BaseDocSwagger } from '@/core/swagger/docs'
import { CreateProductOk, GetAllProductsOk, GetProductByIdOk, UpdateProductOk } from './responses'

export class ProductDocSwagger {
	static getAll() {
		return applyDecorators(
			ApiOperation({
				summary: 'Получить список всех товаров',
				description: 'Только с ролью director и admin'
			}),
			ApiOkResponse({
				type: GetAllProductsOk,
				description: ESwaggerMessages.SUCCESSFULLY_GET_ALL
			}),
			BaseDocSwagger.authWithRole()
		)
	}

	static getById() {
		return applyDecorators(
			ApiOperation({
				summary: 'Получить товар по id',
				description: 'Только с ролью director и admin'
			}),
			ApiOkResponse({
				description: ESwaggerMessages.SUCCESSFULLY_GET_ONE,
				type: GetProductByIdOk
			}),
			ApiNotFoundResponse({ description: ESwaggerMessages.NOT_FOUND }),
			BaseDocSwagger.authWithRole()
		)
	}

	static create() {
		return applyDecorators(
			ApiOperation({
				summary: 'Создать новый товар',
				description: 'Только с ролью director'
			}),
			ApiOkResponse({
				description: ESwaggerMessages.SUCCESSFULLY_CREATE,
				type: CreateProductOk
			}),
			ApiNotFoundResponse({ description: ESwaggerMessages.NO_FOUND_DEPENDENT_OBJECTS }),
			BaseDocSwagger.authWithRole()
		)
	}

	static update() {
		return applyDecorators(
			ApiOperation({
				summary: 'Изменить товар',
				description: 'Только с ролью director'
			}),
			ApiOkResponse({
				description: ESwaggerMessages.SUCCESSFULLY_UPDATE,
				type: UpdateProductOk
			}),
			ApiNotFoundResponse({ description: ESwaggerMessages.NOT_FOUND }),
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
