import { ConfigService } from '@nestjs/config'
import { ELoggerLevels, ENodeEnv } from '../enums'
import { format } from 'winston'
import { HttpStatus } from '@nestjs/common'

const { printf } = format

export class LoggerUtils {
	private isProduction: boolean
	private readonly expectedLevels = ['event', 'error']

	constructor(configService: ConfigService) {
		this.isProduction = configService.get('NODE_ENV') === ENodeEnv.PRODUCTION
	}

	filterForDev = format(info => {
		if (!this.isProduction) {
			return false
		}
		return info
	})

	filterByLevel = format(info => {
		if (!this.expectedLevels.includes(info.level)) {
			return false
		}
		return info
	})

	logFormat = printf(info => {
		const { level, timestamp } = info

		return `${timestamp} ${level}: ${this.getFormattedMessage(info)}`
	})

	parseMessage = format(info => {
		Object.assign(info, JSON.parse(info.message))
		console.log(info)
		return info
	})

	private getFormattedMessage({
		message,
		level,
		status,
		event
	}: {
		message: string
		level: string
		status?: HttpStatus
		event?: string
	}) {
		const body: { event: string; message: string; status?: HttpStatus } = { event, message }

		if (level === ELoggerLevels.ERROR) {
			body.status = status
		}

		return '<log>' + JSON.stringify(body) + '</log>'
	}
}
