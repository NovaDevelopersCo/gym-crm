import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SessionEntity } from './entities'
import { TokenService } from './token.service'
import { JwtModule } from '@nestjs/jwt'
import { StaffModule } from '@/modules/staff/staff.module'
import { AccessJwtStrategy, RefreshJwtStrategy } from './strategies'
import { ConfigService } from '@nestjs/config'
import { getJwtConfig } from '@/configs'
import { JWT_CONFIG_PROVIDE } from '@/core/constants'

@Module({
	imports: [TypeOrmModule.forFeature([SessionEntity]), JwtModule.register({}), StaffModule],
	controllers: [AuthController],
	providers: [
		AuthService,
		TokenService,
		RefreshJwtStrategy,
		AccessJwtStrategy,
		{ provide: JWT_CONFIG_PROVIDE, inject: [ConfigService], useFactory: getJwtConfig }
	]
})
export class AuthModule {}
