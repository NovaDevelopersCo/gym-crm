import { Module } from '@nestjs/common'
import { DirectionController } from './direction.controller'
import { DirectionService } from './direction.service'

@Module({
	controllers: [DirectionController],
	providers: [DirectionService],
	exports: [DirectionService]
})
export class DirectionModule {}
