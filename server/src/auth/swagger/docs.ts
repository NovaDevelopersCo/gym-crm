import { applyDecorators } from '@nestjs/common'

import {
	ApiOperation,
	ApiOkResponse,
	ApiUnauthorizedResponse,
	ApiNoContentResponse,
	ApiBadRequestResponse
} from '@nestjs/swagger'

import { EAuthSwaggerMessages } from './messages.enum'

import { RefreshOk } from './responses'

import { ESwaggerMessages } from '@/core/swagger'

export class AuthDocSwagger {
	static login() {
		return applyDecorators(
			ApiOperation({ summary: 'Логин в профиле управляющего' }),
			ApiNoContentResponse({ description: 'Успешный вход' }),
			ApiBadRequestResponse({ status: 400, description: EAuthSwaggerMessages.LOGIN })
		)
	}

	static refresh() {
		return applyDecorators(
			ApiOperation({ summary: 'Обновление токенов' }),
			ApiUnauthorizedResponse({ description: ESwaggerMessages.UNAUTHORIZED }),
			ApiOkResponse({ description: 'Access токен', type: RefreshOk })
		)
	}

	static logout() {
		return applyDecorators(
			ApiOperation({ summary: 'Выход из профиля' }),
			ApiOkResponse({ description: 'Успешный выход из профиля', status: 200 })
		)
	}
}
