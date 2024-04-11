import { Module } from '@nestjs/common'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from './entities'
import { ClubModule } from '@/modules/club/club.module'
import { GroupModule } from '@/modules/group/group.module'
import { StaffModule } from '../staff/staff.module'

@Module({
	imports: [TypeOrmModule.forFeature([UserEntity]), ClubModule, GroupModule, StaffModule],
	controllers: [UserController],
	providers: [UserService],
	exports: [UserService]
})
export class UserModule {}
