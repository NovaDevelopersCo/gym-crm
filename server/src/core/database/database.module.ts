import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { getTypeormOptions } from '@/configs'
import { DataBaseService } from './database.service'

@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getTypeormOptions
		})
	],
	exports: [DataBaseService],
	providers: [DataBaseService]
})
export class DataBaseModule {}
