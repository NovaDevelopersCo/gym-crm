import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { EnvConfigOptions } from '@config'
import { PrismaModule } from './database/prisma.module'

@Module({
	imports: [PrismaModule, ConfigModule.forRoot(EnvConfigOptions)]
})
export class AppModule {}
