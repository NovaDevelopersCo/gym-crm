import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { EnvConfigOptions } from './configs'

@Module({
	imports: [ConfigModule.forRoot(EnvConfigOptions)]
})
export class AppModule {}
