import { Module } from '@nestjs/common'
import { ClubController } from './club.controller'
import { ClubService } from './club.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ClubEntity } from './entities'
import { StaffModule } from '../staff/staff.module'
import { DataBaseModule } from '@/core/database/database.module'
import { LoggerModule } from '@/core/logger/logger.module'

@Module({
	imports: [TypeOrmModule.forFeature([ClubEntity]), StaffModule, DataBaseModule, LoggerModule],
	controllers: [ClubController],
	providers: [ClubService],
	exports: [ClubService]
})
export class ClubModule {}
