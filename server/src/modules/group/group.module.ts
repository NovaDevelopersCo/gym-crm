import { Module } from '@nestjs/common'

import { GroupService } from './group.service'
import { GroupController } from './group.controller'
import { GroupEntity } from './entities'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
	imports: [TypeOrmModule.forFeature([GroupEntity])],
	exports: [GroupService],
	providers: [GroupService],
	controllers: [GroupController]
})
export class GroupModule {}
