import { Module } from '@nestjs/common'
import { DirectionController } from './direction.controller'
import { DirectionService } from './direction.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DirectionEntity } from './entities'

@Module({
	imports: [TypeOrmModule.forFeature([DirectionEntity])],
	controllers: [DirectionController],
	providers: [DirectionService]
})
export class DirectionModule {}
