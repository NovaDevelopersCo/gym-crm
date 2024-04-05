import { Module } from '@nestjs/common'
import { AbonementController } from './abonement.controller'
import { AbonementService } from './abonement.service'
import { AbonementEntity } from './entities'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
	providers: [AbonementService],
	controllers: [AbonementController],
	imports: [TypeOrmModule.forFeature([AbonementEntity])],
	exports: [AbonementService]
})
export class AbonementModule {}
