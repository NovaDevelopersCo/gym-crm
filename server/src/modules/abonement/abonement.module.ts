import { Module } from '@nestjs/common'
import { AbonementController } from './abonement.controller'
import { AbonementService } from './abonement.service'
import { AbonementEntity, UserAbonementEntity } from './entities'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
	providers: [AbonementService],
	controllers: [AbonementController],
	imports: [TypeOrmModule.forFeature([AbonementEntity, UserAbonementEntity])],
	exports: [AbonementService]
})
export class AbonementModule {}
