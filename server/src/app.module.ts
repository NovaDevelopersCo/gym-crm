import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { EnvConfigOptions } from '@config'
import { PrismaModule } from '@database/prisma.module'
import { AuthModule } from './auth/auth.module'

@Module({
	imports: [PrismaModule, ConfigModule.forRoot(EnvConfigOptions), AuthModule]
})
export class AppModule {}
