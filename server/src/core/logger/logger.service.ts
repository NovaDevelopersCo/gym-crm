import { WINSTON_MODULE_PROVIDER } from 'nest-winston'
import { Inject, Injectable, HttpStatus } from '@nestjs/common'
import { Logger } from 'winston'
import { ELoggerLevels } from '../enums'

@Injectable()
export class LoggerService {
	constructor(
		@Inject(WINSTON_MODULE_PROVIDER)
		private readonly logger: Logger
	) {}

	error(event: string, message: string, status: HttpStatus) {
		this.logger.log(ELoggerLevels.ERROR, JSON.stringify({ message, status, event }))
	}

	event(event: string, message: string) {
		this.logger.log(ELoggerLevels.EVENT, JSON.stringify({ message, event }))
	}
}
