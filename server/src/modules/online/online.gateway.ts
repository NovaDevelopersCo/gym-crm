import { WebSocketGateway } from '@nestjs/websockets'
import { OnlineService } from './online.service'
import { ClientIo } from '@/ws/dto'

@WebSocketGateway({
	cors: {
		origin: '*'
	}
})
export class OnlineGateway {
	constructor(private readonly onlineService: OnlineService) {}

	handleConnection(client: ClientIo) {
		this.onlineService.handleConnection(client)
	}

	handleDisconnect(client: ClientIo) {
		this.onlineService.handleDisconnect(client)
	}
}
