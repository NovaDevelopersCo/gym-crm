import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common'
import type { Response, Request } from 'express'
import { LoggerService } from '../logger/logger.service'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
	constructor(private readonly logger: LoggerService) {}

	catch(exception: HttpException, host: ArgumentsHost) {
		const ctx = host.switchToHttp()
		const res = ctx.getResponse<Response>()
		const req = ctx.getRequest<Request>()
		const { message, statusCode } = exception.getResponse() as {
			message: string
			statusCode: HttpStatus
		}

		this.logger.error(req.url, message, statusCode)

		res.status(statusCode).json({
			message,
			statusCode
		})
	}
}
