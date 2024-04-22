import type { WinstonModuleOptions } from 'nest-winston'

import * as winston from 'winston'

export const winstonConfig: WinstonModuleOptions = {
	transports: [
		new winston.transports.File({
			dirname: 'logs',
			filename: 'app.log'
		})
	]
}
