import { Module } from '@nestjs/common'
import { LoggerService } from './logger.service'
import { WinstonModule } from 'nest-winston'
import { ConfigModule } from '@nestjs/config'
import { ConfigService } from '@nestjs/config'
import { getWinstonConfig } from '@/configs'

@Module({
	imports: [
		WinstonModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getWinstonConfig
		})
	],
	providers: [LoggerService],
	exports: [LoggerService]
})
export class LoggerModule {}
