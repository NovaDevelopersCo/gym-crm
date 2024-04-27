import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SessionEntity } from './entities'
import { TokenService } from './token.service'
import { JwtModule } from '@nestjs/jwt'
import { StaffModule } from '@/modules/staff/staff.module'
import { AccessJwtStrategy, RefreshJwtStrategy } from './strategies'

@Module({
	imports: [TypeOrmModule.forFeature([SessionEntity]), JwtModule.register({}), StaffModule],
	controllers: [AuthController],
	providers: [AuthService, TokenService, RefreshJwtStrategy, AccessJwtStrategy]
})
export class AuthModule {}
