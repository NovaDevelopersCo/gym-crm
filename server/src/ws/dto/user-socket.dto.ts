import { Socket } from 'socket.io'
import { JwtPayload } from '@/auth/dto'

export class ClientIo extends Socket {
	user: JwtPayload
}
