import { ClientIo } from '@/ws/dto'
import { Injectable } from '@nestjs/common'
import { ESocketEvents } from '@/core/enums'

@Injectable()
export class OnlineService {
	// socketid - userid
	private readonly users: Map<string, string> = new Map()

	public handleConnection(client: ClientIo) {
		const userId = String(client.user.id)

		this.users.set(client.id, userId)

		client.broadcast.emit(ESocketEvents.USER_CONNECT, userId)
	}

	public handleDisconnect(client: ClientIo) {
		this.users.delete(client.id)

		client.broadcast.emit(ESocketEvents.USER_DISCONNECT, String(client.user.id))
	}
}
