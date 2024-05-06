import { Module } from '@nestjs/common'
import { OnlineGateway } from './online.gateway'
import { OnlineService } from './online.service'

@Module({
	providers: [OnlineGateway, OnlineService]
})
export class OnlineModule {}
