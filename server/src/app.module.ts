import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { EnvConfigOptions } from './config'

@Module({
	imports: [ConfigModule.forRoot(EnvConfigOptions)]
})
export class AppModule {}
