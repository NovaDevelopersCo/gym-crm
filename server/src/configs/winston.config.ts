import { LoggerUtils } from '@/core/utils'
import { ELoggerLevels } from '@/core/enums'
import { ConfigService } from '@nestjs/config'
import type { WinstonModuleOptions } from 'nest-winston'

import * as winston from 'winston'

// App logs:
//     timestamp
//     level: error / info
//     message

// Event logs:
//     timestamp
//     message

export const getWinstonConfig = (configService: ConfigService): WinstonModuleOptions => {
	const utils = new LoggerUtils(configService)

	return {
		format: winston.format.combine(
			utils.parseMessage(),
			utils.filterForDev(),
			utils.filterByLevel(),
			winston.format.json()
		),
		transports: [
			new winston.transports.File({
				dirname: 'logs',
				filename: 'app.log',
				level: ELoggerLevels.ERROR,
				format: winston.format.combine(winston.format.timestamp(), utils.logFormat)
			})
		],
		levels: {
			[ELoggerLevels.EVENT]: 0,
			[ELoggerLevels.INFO]: 1,
			[ELoggerLevels.ERROR]: 2
		}
	}
}
