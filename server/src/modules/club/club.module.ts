import { Module } from '@nestjs/common'
import { ClubController } from './club.controller'
import { ClubService } from './club.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ClubEntity } from './entities'

@Module({
	imports: [TypeOrmModule.forFeature([ClubEntity])],
	controllers: [ClubController],
	providers: [ClubService],
	exports: [ClubService]
})
export class ClubModule {}
