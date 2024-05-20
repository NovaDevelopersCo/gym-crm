import { applyDecorators } from '@nestjs/common'
import { ESwaggerMessages } from './messages.enum'
import {
	ApiBadRequestResponse,
	ApiBearerAuth,
	ApiForbiddenResponse,
	ApiNoContentResponse,
	ApiNotFoundResponse,
	ApiUnauthorizedResponse
} from '@nestjs/swagger'

export class BaseDocSwagger {
	public static auth() {
		return applyDecorators(
			ApiBearerAuth('access-token'),
			ApiUnauthorizedResponse({ description: ESwaggerMessages.UNAUTHORIZED }),
			ApiBadRequestResponse({ description: ESwaggerMessages.BAD_REQUEST })
		)
	}

	public static authWithRole() {
		return applyDecorators(
			BaseDocSwagger.auth(),
			ApiForbiddenResponse({ description: ESwaggerMessages.FORBIDDEN })
		)
	}

	public static delete() {
		return applyDecorators(
			BaseDocSwagger.authWithRole(),
			ApiNotFoundResponse({ description: ESwaggerMessages.NOT_FOUND }),
			ApiNoContentResponse({ description: ESwaggerMessages.SUCCESSFULLY_DELETE })
		)
	}
}
