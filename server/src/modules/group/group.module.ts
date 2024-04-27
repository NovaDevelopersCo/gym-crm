import { Module } from '@nestjs/common'
import { GroupService } from './group.service'
import { GroupController } from './group.controller'
import { GroupEntity } from './entities'
import { TypeOrmModule } from '@nestjs/typeorm'
import { StaffModule } from '../staff/staff.module'
import { ClubModule } from '../club/club.module'
import { DirectionModule } from '../direction/direction.module'

@Module({
	imports: [TypeOrmModule.forFeature([GroupEntity]), StaffModule, ClubModule, DirectionModule],
	exports: [GroupService],
	providers: [GroupService],
	controllers: [GroupController]
})
export class GroupModule {}
