import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { EnvConfigOptions } from '@config'
import { AuthModule } from './auth/auth.module'

@Module({
	imports: [ConfigModule.forRoot(EnvConfigOptions), AuthModule]
})
export class AppModule {}
