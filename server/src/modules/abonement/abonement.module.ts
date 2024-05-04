import { Module } from '@nestjs/common'
import { AbonementController } from './abonement.controller'
import { AbonementService } from './abonement.service'
import { AbonementEntity, UserAbonementEntity } from './entities'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserModule } from '../user/user.module'
import { UserAbonementController } from './user-abonement.controller'
import { UserAbonementService } from './user-abonement.service'
import { ClubModule } from '../club/club.module'

@Module({
	providers: [AbonementService, UserAbonementService],
	controllers: [UserAbonementController, AbonementController],
	imports: [
		TypeOrmModule.forFeature([AbonementEntity, UserAbonementEntity]),
		UserModule,
		ClubModule
	],
	exports: [AbonementService]
})
export class AbonementModule {}
