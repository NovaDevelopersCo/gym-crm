import { Module } from '@nestjs/common'
import { ClubController } from './club.controller'
import { ClubService } from './club.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ClubEntity } from './entities'
import { StaffModule } from '../staff/staff.module'
import { DataBaseModule } from '@/core/database/database.module'

@Module({
	imports: [TypeOrmModule.forFeature([ClubEntity]), StaffModule, DataBaseModule],
	controllers: [ClubController],
	providers: [ClubService],
	exports: [ClubService]
})
export class ClubModule {}
