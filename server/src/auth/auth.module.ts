import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { StaffEntity, SessionEntity } from './entities'
import { TokenService } from './token.service'
import { JwtModule } from '@nestjs/jwt'
import { StaffService } from '@/modules/staff/staff.service'

@Module({
	imports: [TypeOrmModule.forFeature([StaffEntity, SessionEntity]), JwtModule.register({})],
	controllers: [AuthController],
	providers: [AuthService, TokenService, StaffService]
})
export class AuthModule {}
