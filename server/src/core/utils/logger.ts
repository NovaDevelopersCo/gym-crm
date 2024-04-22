import { ConfigService } from '@nestjs/config'
import { ELoggerLevels, ENodeEnv } from '../enums'
import { format } from 'winston'
import { HttpStatus } from '@nestjs/common'

const { printf } = format

export class LoggerUtils {
	private isProduction: boolean
	private readonly expectedLevels = ['event', 'info', 'error']

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
		status
	}: {
		message: string
		level: string
		status?: HttpStatus
	}) {
		if (level === ELoggerLevels.EVENT) {
			return '<event>' + `${JSON.stringify({ message, status })}` + '</event>'
		}

		return message
	}
}
